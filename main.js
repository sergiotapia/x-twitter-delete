/*
You can copy and paste this to run in your browser console. Please
see README.md before you try to run this, you need to copy something
from your browser before this will work.
*/

async function autoDeleteAllTweets() {
    const profileUsername = window.location.pathname.split('/')[1];
    let totalDeleted = 0;

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.6',
        'authorization': 'Bearer AAAAAAAAAAAAAAAAA~~~~~~~~~~~~~~',
        'content-type': 'application/json',
        'origin': 'https://x.com',
        'priority': 'u=1, i',
        'referer': 'https://x.com/my-username-123/with_replies',
        'sec-ch-ua': '"Brave";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        'sec-ch-ua-arch': '"x86"',
        'sec-ch-ua-bitness': '"64"',
        'sec-ch-ua-full-version-list': '"Brave";v="137.0.0.0", "Chromium";v="137.0.0.0", "Not/A)Brand";v="24.0.0.0"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua-platform-version': '"19.0.0"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        'x-client-transaction-id': 'Td70fZDfgySCFAwGSaInQ2ttPh~~~~~~~~~~~~~~~~',
        'x-csrf-token': '92e67376bd8272cd6609ed4134afe7cc9d53acc146c8f5bf793b84d9b52aebf4380771e83d97fd1dd4ccf7850e3980b8622acb92a8352951d5ef8385cd2a77c7458cfcd70b068616b3eb74970beb94cf',
        'x-twitter-active-user': 'yes',
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-client-language': 'en',
        'x-xp-forwarded-for': 'd4d661539869745c9ff9455efc5a64ff2fdc4f725a8fa3a9e0648a2e08ec8882e6148398120fe743c529a67c2748a530f1b1975bebeb221c874a35a1ad531c9ba7671b18b3bcad010dbc9cd93eb7dcaf7e281c98ab819227e13059bdf80a013b2e850e652482eaf129868649f6958349bdcdd2c8e189ac86752cfb1b31c4dcd724ae2e956a755f48e39bdb31ba12eae6445fc56de87bca750254647585261da802a518f351bfcaaf0d631c78a4b713e0ad6454ab3e138fd5abd31fe0785ed738b6f57ae751b0b72579bc1b6c520ce48fd645a021d99fdf33f0a2b94854ab0f662e62bf285a30d360def203d056fc5b6c468ce2c7ce28c3d9573486'
    };

    function getMyTweetIds() {
        const allTweetArticles = document.querySelectorAll('article[data-testid*="tweet"]');
        console.log(`🔍 Found ${allTweetArticles.length} tweet articles on the page.`);

        const tweets = [];
        const seenTweetIds = new Set();

        allTweetArticles.forEach(articleElement => {
            const links = Array.from(articleElement.querySelectorAll('a[href*="/status/"]'));
            const permalink = links.find(a => a.href.includes(`/${profileUsername}/status/`) && a.querySelector('time'));

            if (!permalink) {
                return;
            }

            const tweetId = permalink.href.match(/\/status\/(\d+)/)?.[1];
            if (!tweetId || seenTweetIds.has(tweetId)) {
                return;
            }

            seenTweetIds.add(tweetId);
            const tweetTextElement = articleElement.querySelector('[data-testid="tweetText"]');
            const tweetContent = tweetTextElement ? tweetTextElement.innerText : '[No text content]';

            console.log(`✅ Found your tweet ${tweetId} - "${tweetContent}"`);
            tweets.push({ id: tweetId, content: tweetContent });
        });

        return tweets;
    }

    async function deleteTweet(tweetId, content) {
        try {
            const response = await fetch('https://x.com/i/api/graphql/VaenaVgh5q5ih7kvyVjgtg/DeleteTweet', {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify({
                    "variables": {
                        "tweet_id": tweetId,
                        "dark_request": false
                    },
                    "queryId": "VaenaVgh5q5ih7kvyVjgtg"
                })
            });

            if (response.ok) {
                console.log(`✅ Deleted tweet ${tweetId}`);
                console.log(`📝 Content: "${content}"`);
                totalDeleted++;

                // Remove the tweet element from DOM
                const tweetElement = document.querySelector(`article[data-testid="tweet"] a[href*="/status/${tweetId}"]`)?.closest('article');
                if (tweetElement) {
                    tweetElement.remove();
                }

                return true;
            } else {
                console.log(`❌ Failed to delete tweet ${tweetId}: ${response.status}`);
                console.log(`📝 Content: "${content}"`);
                return false;
            }
        } catch (error) {
            console.log(`❌ Error deleting tweet ${tweetId}:`, error);
            console.log(`📝 Content: "${content}"`);
            return false;
        }
    }

    async function scrollAndWait() {
        console.log('📜 Scrolling to bottom...');
        window.scrollTo(0, document.body.scrollHeight);
        console.log('⏳ Waiting 3 seconds for content to load...');
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log(`🚀 Starting auto-delete for @${profileUsername}`);

    // Initial scroll and wait
    await scrollAndWait();

    while (true) {
        // Sniff all our tweets
        const myTweetIds = getMyTweetIds();
        console.log(`🔍 Found ${myTweetIds.length} of my tweets visible`);

        if (myTweetIds.length === 0) {
            // No tweets visible, try to load more
            console.log('🔄 No tweets visible, trying to load more...');
            await scrollAndWait();

            // Check again after scroll
            const tweetsAfterScroll = getMyTweetIds();
            if (tweetsAfterScroll.length === 0) {
                console.log('🎉 No more tweets found. Script complete!');
                break;
            } else {
                console.log(`📥 Loaded ${tweetsAfterScroll.length} more tweets`);
                continue;
            }
        }

        // Delete each tweet one by one
        for (let i = 0; i < myTweetIds.length; i++) {
            const tweet = myTweetIds[i];
            console.log(`🗑️  Deleting tweet ${i + 1}/${myTweetIds.length}: ${tweet.id}`);

            await deleteTweet(tweet.id, tweet.content);
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second between deletions
        }

        console.log(`✨ Batch complete. Total deleted so far: ${totalDeleted}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Brief pause before checking again
    }

    console.log(`🏁 Finished! Total tweets deleted: ${totalDeleted}`);
}

// Run this to start:
autoDeleteAllTweets();
