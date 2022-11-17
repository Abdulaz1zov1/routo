const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./db/db')
connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))
app.use(express.json({ limit: "5mb" }));

// ============================================================ sayt car API =================================================
app.use('/car', require('./router/carRoutes'))
// ============================================================ sayt exel API ===============================================
app.use('/exel', require('./router/exeRoutes'))
// ============================================================ sayt mobile video API ===============================================
app.use('/video', require('./router/videoRoutes'))
// ============================================================ sayt mobile like API ==================================================
app.use('/like', require('./router/likeRoutes'))
// ============================================================ sayt total API ========================================================
app.use('/total', require('./router/totalRoutes'))
// ============================================================ sayt client ya'ni xarid qilgan shaxslar API ===========================================
app.use('/client', require('./router/ClientRoutes'))
// ============================================================ sayt order API ===========================================================
app.use('/order', require('./router/orderRoutes'))
// ============================================================ sayt admin API =============================================================
app.use('/auth', require('./router/adminRoutes'))
// ============================================================ sayt super admin API ===========================================================
app.use('/admin', require('./router/superAdmin'))
// ============================================================ sayt xodim API ==============================================================
app.use('/xodim', require('./router/editorRoutes'))
// ============================================================ sayt user API =================================================================
app.use('/user', require('./router/userRoutes'))
// ============================================================ sayt bank API =========================================================
app.use('/bank', require('./router/bankRoutes'))
// ============================================================ mobile marka API ======================================================
app.use('/marka', require('./router/markaRoutes'))
// ============================================================ mobile madel API =========================================================
app.use('/madel', require('./router/madelRoutes'))
// ============================================================ mobilecolor API ===============================================================
app.use('/color', require('./router/colorRoutes'))




app.listen(process.env.PORT || 5000, console.log('run server 5000 port'))
