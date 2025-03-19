// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import GoogleCloudStorageClient from '../../services/googleCloudStorageClient';

const googleCloudStorageClient = new GoogleCloudStorageClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        if (
            !req.body
            || !('fromDate' in req.body)
            || !('toDate' in req.body)
        ) {
            return res.status(422).json({
                message: 'There are required fields',
                fields: {
                    fromDate: 'XXXX.XX.XX',
                    toDate: 'XXXX.XX.XX',
                },
            });
        }

        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;

        try {
            const suggestionsRecap = await googleCloudStorageClient.readJsonFile(`recaps/${fromDate}.json`);
            const guessed = (suggestionsRecap as object[]).filter((suggestion) => suggestion.result.is_guessed === 'YES');

            let win = new Decimal(0);
            for (let i = 0; i < guessed.length; i++) {
                win = win.plus(new Decimal(guessed[i].suggestion.odd));
            }
            const pnl = win.minus(new Decimal(suggestionsRecap.length)).toFixed(3);

            return res.status(200).json({
                data: {
                    pnl: pnl,
                },
            });
        } catch (error) {
            console.log('error: ', error);
            return res.status(500).json({
                message: error.message,
            });
        }
    } else {
        return res.status(405).json({message: 'Method Not Allowed'});
    }
}
