import {Config} from "./config.model";
import { Recipient } from "./recipient.model"

export type TokenLock = {
    recipients: Recipient[],
    configuration: Config,
}