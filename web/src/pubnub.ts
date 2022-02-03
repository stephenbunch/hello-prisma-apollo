import Pubnub from "pubnub";

export const pubnub = new Pubnub({
  publishKey: "pub-c-787e95bc-b715-4f74-8b0d-a96381f506f1",
  subscribeKey: "sub-c-36a4baa8-f9b9-11e4-afbd-02ee2ddab7fe",
  uuid: process.env.NODE_ENV,
});
