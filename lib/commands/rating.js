import { getPlayerFromUsernameQuery } from '../queries';
import enforceWordCount from '../utls/enforceWordCount';
import getWord from '../utls/getWord';

/**
 * Command to check the rating of another player
 * Syntax: !rating <username>
 */
async function rating(msg) {
    const userMessage = msg.content;
    if (userMessage.startsWith('!rank')) {
        if (enforceWordCount(userMessage, 2)) {
            const username = getWord(userMessage, 2);
            const response = await getPlayerFromUsernameQuery(username);

            // Success
            if (response) {
                return {
                    responseMessage: `User ${username} has a rating of ${response.rating}. \n Matches: ${response._matchesMeta.count} \n Wins/Loss: ${response._wonMatchesMeta.count} - ${response._lostMatchesMeta.count}  `,
                    deleteSenderMessage: false
                };
            }

            // Error - Not found
            return {
                responseMessage: `User ${username} does not exist.`,
                deleteSenderMessage: false
            };
        }

        // Error Syntax
        return {
            responseMessage: 'Syntax error: Make sure to type: !rank <username>',
            deleteSenderMessage: true
        };
    }

    // Resolve promise
    return false;
}

export default rating;
