import express from 'express';// Importing express
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
// Remove the User import since we're not using it directly here
import testRoutes from './routes/testRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import authRoutes from './routes/authRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import userRoutes from './routes/userRoutes.js';

const routes = Router();

dotenv.config();

const app = express();

app.use(`/api/test`, testRoutes);
app.use(`/api/mood`, moodRoutes);
app.use(`/api/playlists`, playlistRoutes);
app.use(cors());
app.use(express.json());

// Use the test routes
app.use('/api/test', testRoutes);
app.use('/api/mood', moodRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established.');

        await sequelize.sync({ alter: true });
        console.log('✅ Database synchronized.');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting server:', error);
    }
};

startServer();