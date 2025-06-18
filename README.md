# X Twitter Delete Script

Copy and paste this script, and run it in your browser's console. It will start deleting
your tweets automatically, you can even use different tabs while it does the work.

![image](https://github.com/user-attachments/assets/db11c01d-2509-443d-9d6a-d5fac75de560)

## How it works

The script automates the tedious process of manually deleting tweets by:

### Profile Detection: 
Extracts your username from the current page URL to ensure it only deletes your own tweets

### Tweet Discovery: 
Continuously scrolls through your profile page and scans for tweet elements using DOM selectors (article[data-testid="tweet"]), 
filtering to only find tweets authored by you

### Batch Processing: 
Groups visible tweets and processes them in batches, deleting each one individually with a 
1-second delay between requests to avoid rate limiting

### API Calls: 
Makes authenticated POST requests to Twitter's internal GraphQL API (/i/api/graphql/VaenaVgh5q5ih7kvyVjgtg/DeleteTweet) 
using your browser's existing session cookies and headers

### Infinite Scroll: 
Automatically scrolls to the bottom of the page to load more tweets, waits 3 seconds for content to load, 
then repeats the process until no more tweets are found

### Progress Tracking: 
Logs detailed progress to the console showing which tweets are being deleted and maintains a running count

The script essentially mimics what you'd do manually - scroll, find your tweets, click delete 
on each one - but does it automatically at scale. It runs entirely in your browser using your 
existing authentication, so no external tools or API keys are needed.

## How to use

1. Open your Replies tab.
2. Open your browser's Network tab, and select `Fetch/XHR` to filter for those requests.
3. Manually delete a Tweet to see that request.
![image](https://github.com/user-attachments/assets/6d787e01-c502-4984-8667-56273908cb13)
4. Right click `DeleteTweet` in the Network tab, and copy the request as curl (bash).
![image](https://github.com/user-attachments/assets/70a80cf7-58bf-4f77-98d0-753861f190f6)
5. You can now use these variables to replace them in the script.
```
curl 'https://x.com/i/api/graphql/VaenaVgh5q5ih7kvyVjgtg/DeleteTweet' \
  -H 'accept: */*' \
  -H 'accept-language: en-US,en;q=0.6' \
  -H 'authorization: Bearer AAAAAAAAAAAAAAAAAAAAAN~~~~~~~~' \
  -H 'content-type: application/json' \
  -b 'night_mode=0; dnt=1; d_prefs=MjoxLGNvbnNlbnRfdmVyc2lvbjoyLHRleHRfdmVyc2lvbjoxMDAw; guest_id=v1%3A174084130947493462; kdt=uwJKET8NCwIgCqKrHbY45BV7H8EQBU7dwM6u8Y3L; auth_token=2189514e8228e954a34697e89774f9f023ba76c1; ct0=92e67376bd8272cd6609ed4134afe7cc9d53acc146c8f5bf793b84d9b52aebf4380771e83d97fd1dd4ccf7850e3980b8622acb92a8352951d5ef8385cd2a77c7458cfcd70b068616b3eb74970beb94cf; twid=u%3D1839109450692702208; guest_id_marketing=v1%3A174084130947493462; guest_id_ads=v1%3A174084130947493462; lang=en; cf_clearance=FX6MRiyxI.xuwihlMHTj1SnGK5hQsrUtsUKY07kc8oQ-1750181395-1.2.1.1-qmJ57sxhsR0Uw.zSYr14wZW0.tAwHCcaBjeXI1x15FUauLDoAkjjbjEoTS6o8rZravpVGc.YbgEaF_QEWfVrwM6ztdUKVHenjzEhJKH2ZAz6zt1AoODT7xBSGMhXC9L7M..TVFV5IjyQJKqgWepv2rY4MxD_hUCm8j3fLJCyen4e9DReI1XXgmdWWqS244H2jRAe2CQTXkVS_5VBKEkkqI7V1EvmwLpql4tLBbwtPXcTDszqVRaaQiOM1YiMu80sE6dTs7RsLfSO4sa6Y_bdNBi.faDv0EDY.IgPdkPes5j9DIgwqGQSyQW9wjDk.wGpHrRSreo.2Jj_QW931X2INEj0hiy9PC.jX04iqdyNsRXf8hwYf430Z2mBG_Op8rJi; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCNO68H6XAToMY3NyZl9p%250AZCIlMDExOGIwYWJjMGFhYjhjZDdkYzJmMDM1MjQxZDZhYWY6B2lkIiU1ZDJk%250AOGRiYjhiZDQ5NDA2NGUxZjZiMDVkYTI0N2Y3Ng%253D%253D--fb24aebb0826ba9ccdfba1d43c5901cdd085df88; external_referer=8e8t2xd8A2w%3D|0|F8C7rVpldvGNltGxuH%2ByoRY%2FzjrflHIZH061f%2B5OiIwP17ZTz34ZGg%3D%3D; personalization_id="v1_yCuiesCoBkQRO1S+QM6eCQ=="; __cf_bm=Yqf4omCzwlj6sZGQVwVn2r2MD45zgiVsZQ7nLHazOsE-1750266344-1.0.1.1-VBz7.1bGGUvb6VmQ0iYg1ukWG4cqwBxcQb2l0EBVDFT5Tw7PAukmshld3p8alzFkLX8ys0eyZpGLE7OvO26mJ65i_7veT_BK9PVgd0hSv.4' \
  -H 'origin: https://x.com' \
  -H 'priority: u=1, i' \
  -H 'referer: https://x.com/my-username-123/with_replies' \
  -H 'sec-ch-ua: "Brave";v="137", "Chromium";v="137", "Not/A)Brand";v="24"' \
  -H 'sec-ch-ua-arch: "x86"' \
  -H 'sec-ch-ua-bitness: "64"' \
  -H 'sec-ch-ua-full-version-list: "Brave";v="137.0.0.0", "Chromium";v="137.0.0.0", "Not/A)Brand";v="24.0.0.0"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-model: ""' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-ch-ua-platform-version: "19.0.0"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-gpc: 1' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36' \
  -H 'x-client-transaction-id: JzfO+ZNeBehu~~~~~~~~~~~~~~~' \
  -H 'x-csrf-token: 92e67376bd8272cd6609ed4134afe7cc9d53acc146c8f5bf793b84d9b52aebf4380771e83d97fd1dd4ccf7850e3980b8622acb92a8352951d5ef8385cd2a77c7458cfcd70b068616b3eb74970beb94cf' \
  -H 'x-twitter-active-user: yes' \
  -H 'x-twitter-auth-type: OAuth2Session' \
  -H 'x-twitter-client-language: en' \
  -H 'x-xp-forwarded-for: 7b8bae0f7e19be588e007c248cb4f97a237a768a45d92d439658220788b827146d8a24ec582989757d7aa83e07bc9dd589ba096639b268548d679147bc7c429a2c4cade9c384094dbd6b087ede10d80010ff3b1c4e8863368bc1e607797c5c27f47844c07179af95ad0a987c3d87118965470712ac805661f83edbd2eda921390cf082c2116f72e8e71c3eaa1991ba4999b289ca1ce933a36fd4a52eb725c6c5d39ea6ba21a1437b0b91165fb1022916df1ab2a58ede71ab1ee138360b057cc4c6d6b4fcf184c3792b4a825200516f253d89c12fffdd2eec0fbe04a89155346ad7418992d2040c4d6a9e6580493c680c27a4e2aa13cb9a2d742270' \
  --data-raw '{"variables":{"tweet_id":"1930791445331419494","dark_request":false},"queryId":"VaenaVgh5q5ih7kvyVjgtg"}'
```

I highly recommend you just copy my script + this curl request into Grok or ChatGPT and ask it to replace the variables for you. 

6. With the variables replaced, just copy and paste the script into your browser's console and it will start deleting your tweets.
