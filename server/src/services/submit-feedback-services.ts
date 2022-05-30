import { MailAdapter } from "../adapters/email-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServicesRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackServices {
    constructor(
       private feedbacksRepository: FeedbacksRepository,
       private mailAdapter: MailAdapter,

    ) {}
    async execute(request: SubmitFeedbackServicesRequest) {
        const { type, comment, screenshot } = request;
        
        if(!type){
            throw new Error('Type is require.');
        }

        if(!comment){
            throw new Error('Comment is require.');
        }


        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
                subject: 'novo feedback',
                body: [
                `<div styles="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />`: ``,
                `</div>`
            ].join('\n')
        })

    }
}