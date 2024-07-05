import fs from 'fs';
import path from 'path';

export default function Handler(req, res) {
    if (req.method === 'POST') {
        const { username, score, accuracy, speed } = req.body;
        const filePath = path.join(process.cwd(), 'src/data/scores.json')
        const fileData = fs.readFileSync(filePath, 'utf8');
        const Data = JSON.parse(fileData);
        Data.push({ username, score, accuracy, speed});
        fs.writeFileSync(filePath, JSON.stringify(Data, null, 2));
        res.status(201).json({ message: 'Score added' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}