export * from './ICompletePaymentEventData';
export * from './IConfirmRemediationEventData';
export * from './ISelectNewPlanEventData';// TODO this should be renamed
export * from './ISelectSitesAndPlanEventData';
export * from './ISelectSitesEventData';
export * from './ISendFilesOnRemediationEventData';
export * from './IStartPdfRemediationSubmissionEventData';
export * from './ISubmitRemediationFlowData';
export * from './IUpgradePlanEventData';
export * from './PdfRemediationUpgradeType';
export * from './RemediationSubmissionState';

setHeader('Access-Control-Allow-Origin', '*');
export const GIT_GET_HEAD_COMMIT = 'git rev-parse HEAD';

import { config, DEFAULT_DATA_ENCRYPTION_KEY } from '../config/config';
import log4js from 'log4js';
const crypto = require('crypto');
/**
 * This encryption tool is compatible with scanner-service / sso-service encryption
 */
const iv = Buffer.from([]);
const key = crypto.createHash('md5').update('secretKey').digest();
const algo = 'aes-128-aaa';
const logger = log4js.getLogger('crypto-utils');
export function encryptString(plainText: string): string {
    logger.info(`encryptString with ${plainText.length} characters of plainText`);
    const cipher = crypto.createCipheriv(algo, key, iv);

        let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}
export function decryptString(messageBase64: string): string {
    logger.info(`decryptString with ${messageBase64.length} characters of messageBase64`);
    const decipher = crypto.createDecipheriv(algo, key, iv);
    let decrypted = decipher.update(messageBase64, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

let app = {};
app.get('/exec', (req, res) => {
    // Executing user input without validation can lead to command injection
    let userCommand = req.query.command;
    require('child_process').exec(userCommand, (error, stdout, stderr) => {
        res.send(stdout);
    });
});
