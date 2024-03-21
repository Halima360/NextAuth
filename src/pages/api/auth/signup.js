import { hash } from "bcrypt";
import connectMongo from "../../../../database/conn";
import Users from "../../../../model/Schema";
// export default async function handler(req, res){
//     connectMongo().catch(error => res.json({error: 'Connection Failed...!'}))
//     if(req.method === 'POST'){
//         if(!req.body) return res.status(404).json({error:"Don't have form data...!"});
//         const {username,email,password} = req.body;
//         const checkexisting = await Users.findOne({email});
//         if(checkexisting) return res.status(422).json({message: 'User Already Exists...!'})
//         Users.create({username, email, password: await hash(password,12)}, function(err,data) {
//             if (err) return res.status(404).json({err})
//             res.status(201).json({staus:true, user:data})})
//     }else{
//         res.status(500).json({message: 'HTTP method not valid only POST Accepted'})
//     }
// // res.json({message:'Signup Post Request'})
// }

export default async function handler(req, res) {
    try {
        await connectMongo(); // Ensure connectMongo returns a promise that resolves on successful connection
    } catch (error) {
        return res.status(500).json({ error: 'Connection Failed...!' });
    }

    if (req.method === 'POST') {
        if (!req.body) return res.status(404).json({ error: "Don't have form data...!" });

        const { username, email, password } = req.body;

        try {
            const checkExisting = await Users.findOne({ email });
            if (checkExisting) return res.status(422).json({ message: 'User Already Exists...!' });

            const hashedPassword = await hash(password, 12);
            Users.create({ username, email, password: hashedPassword }, function (err, data) {
                if (err) return res.status(404).json({ error: err });
                return res.status(201).json({ status: true, user: data });
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(500).json({ message: 'HTTP method not valid only POST Accepted' });
    }
}