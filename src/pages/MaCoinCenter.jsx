import React from "react";
import { useNavigate } from "react-router-dom";
import { useEmotion } from "../contexts/EmotionContext";
import Leaderboard from "../components/Leaderboard";

const MaCoinCenter = () => {
  const { currentTheme } = useEmotion();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{
        background: currentTheme.colors.gradient,
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        color: '#fff',
        textAlign: 'center',
        boxShadow: currentTheme.colors.shadow
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>MaCoin Center</h1>
        <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>Earn, track, and celebrate your wellness journey</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: currentTheme.colors.card,
          borderRadius: '15px',
          padding: '1.5rem',
          border: `2px solid ${currentTheme.colors.border}`,
          boxShadow: currentTheme.colors.shadow
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🪙</div>
          <h3 style={{ color: currentTheme.colors.primary, margin: '0 0 0.5rem 0' }}>Coin History</h3>
          <p style={{ color: currentTheme.colors.text, opacity: 0.8 }}>See how you earned MaCoins over time.</p>
          <button className="emotion-button" style={{ marginTop: '1rem', padding: '0.6rem 1rem', borderRadius: 10 }} onClick={() => navigate('/coin-history')}>Open</button>
        </div>

        <div style={{
          background: currentTheme.colors.card,
          borderRadius: '15px',
          padding: '1.5rem',
          border: `2px solid ${currentTheme.colors.border}`,
          boxShadow: currentTheme.colors.shadow
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
          <h3 style={{ color: currentTheme.colors.primary, margin: '0 0 0.5rem 0' }}>Enhanced Coins</h3>
          <p style={{ color: currentTheme.colors.text, opacity: 0.8 }}>Advanced goals and achievements system.</p>
          <button className="emotion-button" style={{ marginTop: '1rem', padding: '0.6rem 1rem', borderRadius: 10 }} onClick={() => navigate('/enhanced-coins')}>Open</button>
        </div>

        <div style={{
          background: currentTheme.colors.card,
          borderRadius: '15px',
          padding: '1.5rem',
          border: `2px solid ${currentTheme.colors.border}`,
          boxShadow: currentTheme.colors.shadow
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
          <h3 style={{ color: currentTheme.colors.primary, margin: '0 0 0.5rem 0' }}>Health Reports</h3>
          <p style={{ color: currentTheme.colors.text, opacity: 0.8 }}>Generate and share health summaries.</p>
          <button className="emotion-button" style={{ marginTop: '1rem', padding: '0.6rem 1rem', borderRadius: 10 }} onClick={() => navigate('/pdf-generator')}>Open</button>
        </div>
      </div>

      <div style={{
        background: currentTheme.colors.card,
        borderRadius: '15px',
        padding: '1.5rem',
        border: `2px solid ${currentTheme.colors.border}`,
        boxShadow: currentTheme.colors.shadow
      }}>
        <h2 style={{ color: currentTheme.colors.primary, marginTop: 0, marginBottom: '1rem' }}>Leaderboard</h2>
        <Leaderboard />
      </div>
    </div>
  );
};

export default MaCoinCenter;
