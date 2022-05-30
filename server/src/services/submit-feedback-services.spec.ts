//Testes Unitarios

import { SubmitFeedbackServices } from "./submit-feedback-services";

describe('submit feedback', () => {
    it('should be able to submit a feedback', () => {
        const submitFeedback = new SubmitFeedbackServices(
            { create: async () => {} },
            { sendMail: async () => {} }
        )
        expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemple',
            screenshot: 'data:image/png;base64',
        })).resolves.not.toThrow();


        it('should not be able to submit feedback without type', async () => {
            await expect(submitFeedback.execute({
                type: '',
                comment: 'example comment',
                screenshot: 'data:image/png;base64',
            })).rejects.toThrow();
        });

        it('should not be able to submit feedback without comment', async () => {
            await expect(submitFeedback.execute({
                type: 'BUG',
                comment: '',
                screenshot: 'data:image/png;base64',
            })).rejects.toThrow();
        });
        it('should not be able to submit feedback with an invalid screenshot', async () => {
            await expect(submitFeedback.execute({
                type: 'BUG',
                comment: 'ta bugado',
                screenshot: '1234',
            })).rejects.toThrow();
        });
    });
});