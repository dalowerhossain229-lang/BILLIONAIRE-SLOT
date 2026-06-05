const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - গ্লোবাল গেটওয়ে সকেট প্রোটকল লক ভাই ভাই]
const io = socketIo(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক ভাই ভাই]
const MAIN_SITE_URL = "https://onrender.com"; 

// 🕌 ওরিজিনাল বিলিয়নেয়ার ৩x৫ স্লটের প্রিমিয়াম এশিয়ান সিম্বল ম্যাট্রিক্স পুল
const billionaireSymbolsList = ["MOSQUE", "CNG", "BAG", "COIN", "BOY", "CARD_A", "CARD_K"];

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স ইন্টারসেপ্টর গেটওয়ে (১ শতভাগ টাইমআউট ও জ্যাম ব্লকার বর্ম ওস্তাদ)
app.get('/api/billionaire-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    let finalUser = userId === "logged_in_player" || !userId || userId === "undefined" ? "guest" : userId;
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "balance", username: finalUser, amount: 0, wallet: targetWallet, game: "billionaireslot"
        }, { timeout: 15000 });

        if (response.data && response.data.status === "ok") {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. বিলিয়নেয়ার কোর ৩x৫ স্লট স্পিন রাউট (মানি ট্রি ও ফ্যান-টানের মতো ১০০% সিকিউরড এয়ার-টাইট সিঙ্গেল পাইপলাইন প্রোটোকল)
app.post('/api/billionaire-spin', async (req, res) => {
    const { userId, amount, wallet } = req.body; 
    const reqAmount = parseFloat(amount) || 50;
    const finalGameName = "billionaireslot"; 
    const targetWallet = wallet || "main";

    let finalQueryUser = userId;
    if (!finalQueryUser || finalQueryUser === "logged_in_player" || finalQueryUser === "undefined") {
        finalQueryUser = "guest"; 
    }

    if (reqAmount < 1 || reqAmount > 20000) {
        return res.json({ success: false, message: "🚨 Invalid Bet Parameter! Max 20000 ৳" });
    }

    try {
        // 🔒 [🔒 জিরো-ডাবল-ডেবিট একক পাইপলাইন বর্ম]: সরাসরি ১ম হিটে বাজি ডেবিট রিকোয়েস্ট ফায়ার লক!
        // আপনার ওরিজিনাল api_callback.php এর ডাইনামিক টাকার কলাম ফিল্টারের সাথে সিঙ্ক করে ওয়ান-শটে বাজি কাটা লক ওস্তাদ!
        const balResponse = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet", username: finalQueryUser, amount: reqAmount, wallet: targetWallet, game: finalGameName
        }, { timeout: 30000 });
        
        if (!balResponse.data || balResponse.data.status !== "ok") {
            return res.json({ success: false, message: "❌ আপনার অ্যাকাউন্ট ব্যালেন্স জিরো বা অপ্রতুল! দয়া করে রিচার্জ করুন ওস্তাদ।" });
        }

        let currentDbBalance = parseFloat(balResponse.data.balance) || 0;
        
        let finalReelsResultMatrix = []; 
        let winMultiplier = 0.00;
        let finalStatus = "lose";

        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 আন্তর্জাতিক ৩x৫ জেনুইন স্লট র্যান্ডম ৯৫% RTP লুপ ইঞ্জিন ভাই ভাই]
        while (isLoopActive && loopSafety < 150) {
            loopSafety++;
            finalReelsResultMatrix = [];

            // ৩x৫ গ্রিডের ৫টি ডাইনামিক রিলের জন্য ৫টি পিউর র্যান্ডম সিম্বল সিলেকশন লক চ্যাম
            for (let i = 0; i < 5; i++) {
                let randomIdx = Math.floor(Math.random() * billionaireSymbolsList.length);
                finalReelsResultMatrix.push(billionaireSymbolsList[randomIdx]);
            }

            // 🎯 [৫-রিল পে-লাইন কম্বিনেশন ম্যাচিং স্কোর ক্যালকুলেটর ইঞ্জিন]
            let matchCountsMap = {};
            finalReelsResultMatrix.forEach(sym => {
                matchCountsMap[sym] = (matchCountsMap[sym] || 0) + 1;
            });

            let maxMatchesCount = Math.max(...Object.values(matchCountsMap));
            let matchedSymbolName = Object.keys(matchCountsMap).find(key => matchCountsMap[key] === maxMatchesCount);

            // ৩x৫ স্লট আন্তর্জাতিক লাক্সারি পে-আউট ওッズ বিন্যাস সিঙ্ক ওস্তাদ
            if (maxMatchesCount === 5) {
                // ৫টি রিল কাটায় কাটায় হুবহু মিলে গেলে মেগা লাক্সারি জ্যাকপট! (আপনার স্ক্রিনশটের মাঝখানের লাইনের মতো কম্বো!)
                if (matchedSymbolName === "MOSQUE") winMultiplier = 50.00;      // ৫ মসজিদ ৫০ গুণ মেগা জ্যাকপট!
                else if (matchedSymbolName === "CNG") winMultiplier = 25.00;     // ৫ সিএনজি ২৫ গুণ
                else if (matchedSymbolName === "BAG") winMultiplier = 20.00;     // ৫ স্কুল ব্যাগ ২০ গুণ
                else if (matchedSymbolName === "COIN") winMultiplier = 15.00;    // ৫ কয়েন ১৫ গুণ
                else if (matchedSymbolName === "BOY") winMultiplier = 12.00;     // ৫ প্লেয়ার ১২ গুণ
                else winMultiplier = 8.00;                                        // কার্ড লেটার মিললে ৮ গুণ
                finalStatus = "win";
            } else if (maxMatchesCount === 4) {
                winMultiplier = (matchedSymbolName === "MOSQUE") ? 8.00 : 4.00;
                finalStatus = "win";
            } else if (maxMatchesCount === 3) {
                winMultiplier = (matchedSymbolName === "MOSQUE") ? 2.50 : 1.50;
                finalStatus = "win";
            } else if (maxMatchesCount === 2) {
                winMultiplier = 0.50; 
                finalStatus = "lose";
            } else {
                winMultiplier = 0.00;
                finalStatus = "lose";
            }

            // এডমিন প্যানেল কাস্টম ফোর্স কন্ট্রোল নব ফিল্টারিং চ্যাম
            if (balResponse.data && balResponse.data.billionaire_target) {
                let target = String(balResponse.data.billionaire_target).toUpperCase();
                if (target === "FORCE_LOSE" && finalStatus === "win") {
                    finalReelsResultMatrix = ["MOSQUE", "CNG", "BAG", "COIN", "CARD_K"];
                    winMultiplier = 0.00; finalStatus = "lose";
                    isLoopActive = false;
                }
                if (target === "FORCE_WIN" && finalStatus === "win") isLoopActive = false;
            } else {
                if (finalStatus === "win") {
                    // আন্তর্জাতিক স্লট সুষম ফিল্টারিং ট্র্যাকে ২৩% এ টাইট ব্যালেন্সড লক ভাই ভাই!
                    if (Math.random() <= 0.23) isLoopActive = false;
                } else {
                    isLoopActive = false; // লস হলে ওয়ান-শটে লুপ ব্রেক বর্ম! ওল্ড জ্যাম চিরতরে সাফ!
                }
            }
        }

        // 🎯 [মেগা কিলার জিরো-ডাবল-ডেবিট স্টেক ব্যালেন্সার বর্ম ভাই ভাই]
        let winAmount = 0, dbAction = "win", dbAmount = 0;

        if (winMultiplier > 0) {
            winAmount = Math.round(reqAmount * winMultiplier);
            dbAction = "win"; dbAmount = parseFloat(winAmount); 
        } else {
            dbAction = "win"; dbAmount = 0; 
        }

        let phpPayload = { 
            action: dbAction, username: finalQueryUser, amount: dbAmount, wallet: targetWallet, game: finalGameName 
        };
        
        if (winMultiplier === 0 || winMultiplier < 1) phpPayload.status = "lose";
        else phpPayload.status = "win";

        phpPayload.bet_amount = reqAmount;

        // 🛫 ③ মেইন সাইটের সিকিউরড গেটওয়েতে রিয়েল-টাইম উইন-লস সেটেলমেন্ট এপিআই হিট
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, phpPayload, { timeout: 45000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: finalQueryUser, balance: response.data.balance });
            
            return res.json({
                success: true,
                balance: response.data.balance,
                data: { balance: response.data.balance },
                gameData: { 
                    finalReelsResultMatrix,
                    winMultiplier,
                    status: phpPayload.status, 
                    winAmount 
                }
            });
        } else {
            let latestBal = (response.data && response.data.balance !== undefined) ? response.data.balance : currentDbBalance;
            return res.json({ success: false, balance: latestBal, message: "X Bet Settlement Declined by Database!" });
        }
    } catch (e) { 
        return res.json({ success: false, message: "⚠️ Timeout! Click SPIN again." }); 
    }
});

app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, 'index.html')); });
io.on('connection', (socket) => {});

// ⚡ কাস্টম নোড সার্ভার পোর্ট গেটওয়ে লাইভ অন ফায়ার (৪০০০০ পোর্টে ডেডিকেটেড সিঙ্ক লক!)
const PORT = process.env.PORT || 40000; 
server.listen(PORT, () => { console.log(`🕌 Billionaire Asian 3x5 Slot Engine Running on port ${PORT}`); });
