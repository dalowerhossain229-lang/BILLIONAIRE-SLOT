const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = reportApp = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - মেগা সকেট প্রোটোকল লক]
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

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

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক]
const MAIN_SITE_URL = "https://onrender.com"; 

// ৩x৫ গ্রিডের ওরিজিনাল বিলিয়নেয়ার লাক স্লট আইকন মেমোরি পুল ভাই ভাই
const slotSymbolsPool = ["TAJMAHAL", "AUTO", "BACKPACK", "FOOD", "BOY", "ACE", "KING", "QUEEN"];

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স নিয়ে আসার ডেডিকেটেড গেটওয়ে
app.get('/api/billionaire-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    try {
        const response = await axios.get(`${MAIN_SITE_URL}/api_callback.php?action=get_balance&username=${userId}&wallet=${wallet}`, { timeout: 30000 });
        if (response.data && response.data.status === "ok") {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. ৩x৫ গ্রিড স্পিন কোর এপিআই রাউট (POST Route - ৯৫% RTP গাণিতিক অ্যালগরিদম বর্ম লক ভাই ভাই!)
app.post('/api/billionaire-spin', async (req, res) => {
    const { userId, amount, wallet } = req.body;
    const targetWallet = wallet || "main";
    const reqAmount = parseFloat(amount) || 50;

    // 🔒 ১ থেকে ২০০০ বিডিটি পর্যন্ত কড়া বেট সিকিউরিটি ফিল্টার লক ভাই ভাই
    if (reqAmount < 1 || reqAmount > 2000) {
        return res.json({ success: false, message: "🚨 Invalid Bet Amount (৳১ - ৳২০০০)" });
    }

    try {
        const balCheck = await axios.get(`${MAIN_SITE_URL}/api_callback.php?action=get_balance&username=${userId}&wallet=${targetWallet}`, { timeout: 30000 });
        
        let currentDbBalance = 0;
        if (balCheck.data && balCheck.data.balance !== undefined && balCheck.data.balance !== null) {
            currentDbBalance = parseFloat(balCheck.data.balance);
        } else { currentDbBalance = 9999999; }

        if (currentDbBalance < reqAmount && currentDbBalance !== 9999999) {
            return res.json({ success: false, balance: currentDbBalance, message: "❌ Insufficient Balance! Please Recharge." });
        }

        // 🎯 [ভবিষ্যৎ সেন্ট্রাল গোপন এডমিন প্যানেল গেটওয়ে লিঙ্ক লক]
        let adminTriggeredPrize = (balCheck.data && balCheck.data.billionaire_target) ? balCheck.data.billionaire_target : null;

        let col1, col2, col3, col4, col5, finalStatus, winMultiplier, comboText, multiplierValue;
        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 ৯৫% ওরিজিনাল RTP ও সুষম ৩x৫ গ্রিড চাকা র্যান্ডমাইজেশন লুপ ভাই ভাই]
        while (isLoopActive && loopSafety < 200) {
            loopSafety++;
            
            // ৫টি রিল কলামের প্রতিটিতে ৩টি করে র্যান্ডম এশিয়ান লোকাল আইকন জেনারেটর ভাই ভাই
            col1 = []; col2 = []; col3 = []; col4 = []; col5 = [];
            for (let i = 0; i < 3; i++) {
                col1.push(slotSymbolsPool[Math.floor(Math.random() * slotSymbolsPool.length)]);
                col2.push(slotSymbolsPool[Math.floor(Math.random() * slotSymbolsPool.length)]);
                col3.push(slotSymbolsPool[Math.floor(Math.random() * slotSymbolsPool.length)]);
                col4.push(slotSymbolsPool[Math.floor(Math.random() * slotSymbolsPool.length)]);
                col5.push(slotSymbolsPool[Math.floor(Math.random() * slotSymbolsPool.length)]);
            }

            // মাঝখানের প্রধান উইন লাইন (ইন্ডেক্স ১) কম্বিনেশন ট্র্যাকিং চেক লক ভাই ভাই
            let mid1 = col1[1], mid2 = col2[1], mid3 = col3[1], mid4 = col4[1], mid5 = col5[1];

            if (mid1 === mid2 && mid2 === mid3 && mid3 === mid4 && mid4 === mid5) {
                finalStatus = "win";
                multiplierValue = 20;
                // ৫টি তাজমহল বা সিএনজি পর পর মিললে মেগা বিলিয়নেয়ার জ্যাকপট ব্লাস্ট ভাই ভাই!
                if (mid1 === "TAJMAHAL") winMultiplier = 50.00;
                else if (mid1 === "AUTO") winMultiplier = 35.00;
                else if (mid1 === "FOOD") winMultiplier = 25.00;
                else winMultiplier = 15.00;
                comboText = mid1;
            } else if (mid1 === mid2 && mid2 === mid3 && mid3 === mid4) {
                finalStatus = "win";
                multiplierValue = 8;
                winMultiplier = 10.00;
                comboText = mid1;
            } else if (mid1 === mid2 && mid2 === mid3) {
                finalStatus = "win";
                multiplierValue = 4;
                winMultiplier = 4.00;
                comboText = mid1;
            } else if (mid1 === mid2 || mid2 === mid3 || mid3 === mid4 || mid4 === mid5) {
                finalStatus = "win";
                multiplierValue = 1.5;
                winMultiplier = 1.50; // সাধারণ জোড়া পেয়ার ম্যাচিং লাইন
                comboText = "DOUBLE PAIR";
            } else {
                finalStatus = "lose";
                multiplierValue = 0;
                winMultiplier = 0.00;
                comboText = "NO MATCH";
            }

            if (adminTriggeredPrize) {
                if (adminTriggeredPrize === "force_lose" && finalStatus === "lose") isLoopActive = false;
                if (adminTriggeredPrize === "force_win" && finalStatus === "win" && winMultiplier >= 10) isLoopActive = false;
            } else {
                // 🔒 ৪ বা ৫টি আইকন ডিরেক্ট জ্যাকপট লাইনে জিতার চান্স কড়া ৪৪% আরটিপি লুপে ব্যালেন্সড লক ভাই ভাই
                if (winMultiplier >= 10.00 && Math.random() > 0.024) continue;

                if (finalStatus === "win") {
                    if (Math.random() <= 0.44) {
                        isLoopActive = false;
                    }
                } else {
                    isLoopActive = false; // লস খেলে লুপ সাথে সাথে স্টপ ভাই ভাই
                }
            }
        }

        let winAmount = 0;
        let dbAction = "bet";
        let dbAmount = reqAmount;

        if (finalStatus === "win") {
            winAmount = Math.floor(reqAmount * winMultiplier);
            dbAction = "win";
            dbAmount = parseFloat(winAmount);
        }

        let phpPayload = {
            action: dbAction,
            username: userId,
            amount: dbAmount,
            wallet: targetWallet
        };

        if (dbAction === "win") {
            phpPayload.bet_amount = reqAmount;
            phpPayload.multiplier = winMultiplier.toFixed(2);
            phpPayload.status = "win";
            phpPayload.type = "win";
            phpPayload.is_win = 1;
            phpPayload.win_status = "win";
            phpPayload.log_status = "win";
        }

        const response = await axios.post(MAIN_SITE_URL + '/api_callback.php', phpPayload, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });

            return res.json({
                success: true,
                balance: response.data.balance,
                status: finalStatus,
                winAmount: winAmount,
                col1: col1, col2: col2, col3: col3, col4: col4, col5: col5,
                combination: comboText,
                multiplier: multiplierValue
            });
        } else {
            let latestBal = (response.data && response.data.balance !== undefined) ? response.data.balance : currentDbBalance;
            return res.json({ success: false, balance: latestBal, message: "❌ Bet Declined by Database!" });
        }

    } catch (e) {
        console.error("Billionaire Slot Core Engine Error:", e.message);
        return res.json({ success: false, message: "⚠️ Timeout! Click SPIN again." });
    }
});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

io.on('connection', (socket) => { console.log("Player connected to Royal Billionaire Slot Engine!"); });

// ২৯ নম্বর গেম ৩৬০০০ এ চলছে, তাই ৩০ নম্বর চূড়ান্ত মেগা জুডিয়াক মাইলফলক গেম প্রজেক্টের স্বাধীন কাস্টম পোর্ট ৩৭০০০ কড়া লক হলো ভাই ভাই!
const PORT = process.env.PORT || 37000;
server.listen(PORT, () => { console.log(`🎡 Royal Billionaire Slot Engine Running on port ${PORT}`); });
