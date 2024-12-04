import { UserType } from "@/type/userType";

export const usersData: UserType[] = [
  {
    id: "1",
    wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    username: "0xPumper_001",
    avatarPath: "/assets/avatars/user1.png",
    likeCount: 1337,
    description:
      "King of shitcoins 🌪 | Pump hunter 🚀 | Strategy: 100% YOLO. No roadmap, just meme vibes. HODL or Lambo 🏎️. Let's moon together!",
    followers: 100,
    likesReceived: 2500,
    mentionsReceived: 350,
    coinsHeld: [
      { symbol: "$MEME", amount: "120984109", id: 1 },
      { symbol: "$SHNJ", amount: "123023020", id: 2 },
    ],
    coinsCreated: [
      {
        id: 1,
        name: "MemeToken",
        symbol: "$SUFO",
        description:
          "SUFO is the most memorable memecoin in existence. The dog and frog days are over, it's time for SUFO to take over.",
        supply: 1000000000,
        bondingCurve: 0.00001,
        minBuy: 0.01,
        maxBuy: 5,
        imagePath: "/assets/exTokenImg1.png",
        creator: "0xPumper_001",
        timestamp: 3600,
        marketCap: "$245.8k",
        address: "0x1234567890abcdef",
        replyCount: 3,
        replies: [
          {
            id: 1,
            username: "CryptoFan",
            date: "2024-02-28",
            time: "14:30",
            text: "This token is the future 🚀",
            coinId: "$SUFO",
          },
          {
            id: 2,
            username: "MoonHunter",
            date: "2024-02-28",
            time: "16:00",
            text: "I'm all in! 💎🙌",
            coinId: "$SUFO",
          },
        ],
        trades: [],
      },
      {
        id: 2,
        name: "Shinja",
        symbol: "$SHNJ",
        description: "The next evolution in meme tokens. To the moon!",
        supply: 420690000000,
        bondingCurve: 0.000015,
        minBuy: 0.05,
        maxBuy: 3,
        imagePath: "/assets/exTokenImg2.png",
        creator: "0xPumper_001",
        timestamp: 7200,
        marketCap: "$567.2k",
        address: "0x1234567890abcdef",
        replyCount: 2,
        replies: [
          {
            id: 3,
            username: "TokenLover",
            date: "2024-02-29",
            time: "09:15",
            text: "This is a long-term hold for me!",
            coinId: "$SHNJ",
          },
        ],
        trades: [
          {
            id: "T001",
            type: "buy",
            amount: 5000,
            date: "2024-02-28",
            transactionNumber: "TX123456789",
            username: "0xPumper_001",
          },
          {
            id: "T002",
            type: "sell",
            amount: 2000,
            date: "2024-02-28",
            transactionNumber: "TX123456790",
            username: "0xPumper_001",
          },
          {
            id: "T003",
            type: "buy",
            amount: 10000,
            date: "2024-03-01",
            transactionNumber: "TX123456791",
            username: "0xPumper_001",
          },
          {
            id: "T004",
            type: "sell",
            amount: 3000,
            date: "2024-03-02",
            transactionNumber: "TX123456792",
            username: "0xPumper_001",
          },
        ],
      },
    ],
    replies: [
      {
        id: 101,
        username: "0xPumper_001",
        date: "2024-02-28",
        time: "14:30",
        text: "Check out $SUFO, it's going to the moon! 🚀",
      },
      {
        id: 102,
        username: "0xPumper_001",
        date: "2024-02-29",
        time: "15:45",
        text: "Just launched $SHNJ, let's go viral!",
      },
    ],
  },
];
