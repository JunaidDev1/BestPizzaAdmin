import { Users } from './users';
import * as firebase from 'firebase';

export class iTweet {
    public tweetText: string;
    public imageUrl: string;
    public timestamp: number;
    public uid: string;
    public key: string;
    public replies: iTweetReply[] = [];
    public isRetweet: boolean;
    public retweet: iRetweet = new iRetweet();
}

export class iRetweet {
    retweetUser: Users;
    retweetData: iTweet = new iTweet();
}

export class iTweetReply {
    replyUser: Users;
    replyData: iTweet = new iTweet();


    postTweetOnFirebase() {
        const self = this;
        const tweetObj = new iTweet();
        tweetObj.key = firebase.database().ref().child(`/tweets/`).push().key;
        firebase.database().ref().child(`/tweets/${tweetObj.key}`).
            set(tweetObj).then(() => {
                // toast message tweet posted successfully!
            });
    }
}
