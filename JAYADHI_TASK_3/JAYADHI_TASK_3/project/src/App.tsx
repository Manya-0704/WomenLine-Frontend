import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  Heart, 
  MessageCircle, 
  Shield, 
  Upload, 
  Gift, 
  GraduationCap, 
  Trophy, 
  ShoppingBag,
  Clock,
  Plus,
  Minus,
  Star,
  Medal,
  Crown,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  Calendar,
  Users,
  Award,
  Sparkles
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  reason: string;
  timestamp: Date;
  category: string;
}

interface LeaderboardUser {
  id: string;
  name: string;
  coins: number;
  rank: number;
  state: string;
  avatar: string;
  streak: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface DailyGoal {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  icon: React.ReactNode;
}

function App() {
  const [coinBalance, setCoinBalance] = useState(1250);
  const [totalEarned, setTotalEarned] = useState(3450);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [lastEarnedAmount, setLastEarnedAmount] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'earn' | 'spend' | 'goals'>('earn');
  const [showAchievement, setShowAchievement] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'earn',
      amount: 50,
      reason: 'Completed daily health journal',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: 'Health Journal'
    },
    {
      id: '2',
      type: 'earn',
      amount: 100,
      reason: 'Uploaded anonymized health logs',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      category: 'Data Contribution'
    },
    {
      id: '3',
      type: 'spend',
      amount: 300,
      reason: 'Advanced coaching tools access',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      category: 'Coaching'
    }
  ]);

  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([
    {
      id: '1',
      title: 'Morning Check-in',
      description: 'Complete your daily health journal',
      reward: 50,
      completed: false,
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: '2',
      title: 'Community Helper',
      description: 'Answer 3 questions in voice Q&A',
      reward: 150,
      completed: false,
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: '3',
      title: 'Data Contributor',
      description: 'Upload health logs to help others',
      reward: 100,
      completed: false,
      icon: <Upload className="w-5 h-5" />
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Earn your first 100 MaCoins',
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      unlocked: true,
      progress: 100,
      maxProgress: 100
    },
    {
      id: '2',
      title: 'Community Champion',
      description: 'Help 50 women in voice Q&A',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      unlocked: false,
      progress: 23,
      maxProgress: 50
    },
    {
      id: '3',
      title: 'Wellness Warrior',
      description: 'Maintain a 30-day streak',
      icon: <Trophy className="w-6 h-6 text-purple-500" />,
      unlocked: false,
      progress: 7,
      maxProgress: 30
    },
    {
      id: '4',
      title: 'Guardian Angel',
      description: 'Report 10 safety concerns',
      icon: <Shield className="w-6 h-6 text-red-500" />,
      unlocked: false,
      progress: 3,
      maxProgress: 10
    }
  ]);

  const [leaderboard] = useState<LeaderboardUser[]>([
    { id: '1', name: 'Priya S.', coins: 2450, rank: 1, state: 'Maharashtra', avatar: '👩🏽‍⚕️', streak: 15 },
    { id: '2', name: 'Anjali K.', coins: 2200, rank: 2, state: 'Karnataka', avatar: '👩🏻‍🎓', streak: 12 },
    { id: '3', name: 'Meera R.', coins: 1950, rank: 3, state: 'Tamil Nadu', avatar: '👩🏾‍💼', streak: 8 },
    { id: '4', name: 'You', coins: 1250, rank: 4, state: 'Delhi', avatar: '👩🏽‍💻', streak: 7 },
    { id: '5', name: 'Kavya M.', coins: 1100, rank: 5, state: 'Kerala', avatar: '👩🏻‍🔬', streak: 5 }
  ]);

  const addTransaction = (type: 'earn' | 'spend', amount: number, reason: string, category: string) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      reason,
      timestamp: new Date(),
      category
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    if (type === 'earn') {
      setCoinBalance(prev => prev + amount);
      setTotalEarned(prev => prev + amount);
      setLastEarnedAmount(amount);
      setShowCoinAnimation(true);
      
      // Check for achievements
      checkAchievements(amount);
      
      setTimeout(() => setShowCoinAnimation(false), 2000);
    } else {
      setCoinBalance(prev => Math.max(0, prev - amount));
    }
  };

  const completeGoal = (goalId: string) => {
    setDailyGoals(prev => prev.map(goal => {
      if (goal.id === goalId && !goal.completed) {
        addTransaction('earn', goal.reward, goal.description, 'Daily Goal');
        return { ...goal, completed: true };
      }
      return goal;
    }));
  };

  const checkAchievements = (earnedAmount: number) => {
    setAchievements(prev => prev.map(achievement => {
      if (!achievement.unlocked) {
        let newProgress = achievement.progress;
        
        if (achievement.id === '2') { // Community Champion
          newProgress = Math.min(achievement.maxProgress, newProgress + 1);
        } else if (achievement.id === '3') { // Wellness Warrior
          newProgress = currentStreak;
        }
        
        if (newProgress >= achievement.maxProgress) {
          setNewAchievement({ ...achievement, unlocked: true, progress: newProgress });
          setShowAchievement(true);
          setTimeout(() => setShowAchievement(false), 4000);
          return { ...achievement, unlocked: true, progress: newProgress };
        }
        
        return { ...achievement, progress: newProgress };
      }
      return achievement;
    }));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <Star className="w-5 h-5 text-purple-400" />;
    }
  };

  const completedGoalsCount = dailyGoals.filter(goal => goal.completed).length;
  const progressPercentage = (completedGoalsCount / dailyGoals.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 relative overflow-hidden">
      {/* Floating coin animation */}
      {showCoinAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="animate-bounce">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
              <Coins className="w-6 h-6" />
              <span className="font-bold text-lg">+{lastEarnedAmount} MaCoins!</span>
            </div>
          </div>
        </div>
      )}

      {/* Achievement notification */}
      {showAchievement && newAchievement && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg shadow-xl max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Achievement Unlocked!</h3>
                <p className="text-sm opacity-90">{newAchievement.title}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">WomenLine</h1>
                <p className="text-sm text-gray-600">Rewards System</p>
              </div>
            </div>
            
            {/* Stats bar */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center space-x-1 text-orange-600">
                  <Zap className="w-4 h-4" />
                  <span className="font-bold">{currentStreak}</span>
                </div>
                <p className="text-xs text-gray-500">Day Streak</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-bold">{totalEarned.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500">Total Earned</p>
              </div>
              
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Coins className="w-5 h-5" />
                <span className="font-bold text-lg">{coinBalance.toLocaleString()}</span>
                <span className="text-sm opacity-90">MaCoins</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Daily Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Target className="w-6 h-6 text-purple-600 mr-2" />
              Daily Progress
            </h2>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">{completedGoalsCount}/{dailyGoals.length}</p>
              <p className="text-sm text-gray-500">Goals Complete</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dailyGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => !goal.completed && completeGoal(goal.id)}
                disabled={goal.completed}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  goal.completed
                    ? 'bg-green-50 border-green-200 cursor-default'
                    : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50 hover:scale-105 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-full ${
                    goal.completed ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {goal.completed ? <CheckCircle className="w-5 h-5" /> : goal.icon}
                  </div>
                  <span className={`font-bold ${
                    goal.completed ? 'text-green-600' : 'text-purple-600'
                  }`}>
                    +{goal.reward}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-left">{goal.title}</h3>
                <p className="text-sm text-gray-600 text-left">{goal.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-2">
              <div className="flex space-x-2">
                {[
                  { id: 'earn', label: 'Earn Coins', icon: Plus },
                  { id: 'spend', label: 'Spend Coins', icon: Minus },
                  { id: 'goals', label: 'Achievements', icon: Trophy }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 ${
                      selectedTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Earn Coins Section */}
            {selectedTab === 'earn' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Sparkles className="w-6 h-6 text-green-600 mr-2" />
                  Earn MaCoins
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => addTransaction('earn', 50, 'Completed daily health journal', 'Health Journal')}
                    className="flex items-center p-6 border-2 border-green-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 group hover:scale-105 hover:shadow-lg"
                  >
                    <Heart className="w-10 h-10 text-green-600 mr-4 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-lg">Health Journal</h3>
                      <p className="text-green-600 font-bold">+50 MaCoins</p>
                      <p className="text-sm text-gray-500">Daily check-in</p>
                    </div>
                  </button>

                  <button
                    onClick={() => addTransaction('earn', 100, 'Uploaded anonymized health data', 'Data Contribution')}
                    className="flex items-center p-6 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group hover:scale-105 hover:shadow-lg"
                  >
                    <Upload className="w-10 h-10 text-blue-600 mr-4 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-lg">Upload Logs</h3>
                      <p className="text-blue-600 font-bold">+100 MaCoins</p>
                      <p className="text-sm text-gray-500">Help other women</p>
                    </div>
                  </button>

                  <button
                    onClick={() => addTransaction('earn', 150, 'Safely reported abuse (verified)', 'Safety Report')}
                    className="flex items-center p-6 border-2 border-red-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-all duration-200 group hover:scale-105 hover:shadow-lg"
                  >
                    <Shield className="w-10 h-10 text-red-600 mr-4 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-lg">Safety Report</h3>
                      <p className="text-red-600 font-bold">+150 MaCoins</p>
                      <p className="text-sm text-gray-500">Verified report</p>
                    </div>
                  </button>

                  <button
                    onClick={() => addTransaction('earn', 200, 'Participated in voice Q&A community', 'Community')}
                    className="flex items-center p-6 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group hover:scale-105 hover:shadow-lg"
                  >
                    <MessageCircle className="w-10 h-10 text-purple-600 mr-4 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-lg">Voice Q&A</h3>
                      <p className="text-purple-600 font-bold">+200 MaCoins</p>
                      <p className="text-sm text-gray-500">Community help</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Spend Coins Section */}
            {selectedTab === 'spend' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Gift className="w-6 h-6 text-pink-600 mr-2" />
                  Spend MaCoins
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => coinBalance >= 300 && addTransaction('spend', 300, 'Advanced coaching tools access', 'Coaching')}
                    disabled={coinBalance < 300}
                    className="flex items-center p-6 border-2 border-orange-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg"
                  >
                    <Trophy className="w-10 h-10 text-orange-600 mr-4 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-lg">Coaching Tools</h3>
                      <p className="text-orange-600 font-bold">-300 MaCoins</p>
                      <p className="text-sm text-gray-500">Advanced features</p>
                    </div>
                  </button>

                  <button
                    onClick={() => coinBalance >= 200 && addTransaction('spend', 200, 'Discount coupon for health products', 'Shopping')}
                    disabled={coinBalance < 200}
                    className="flex items-center p-6 border-2 border-pink-200 rounded-xl hover:border-pink-400 hover:bg-pink-50 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg"
                  >
                    <ShoppingBag className="w-10 h-10 text-pink-600 mr-4 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-lg">Health Products</h3>
                      <p className="text-pink-600 font-bold">-200 MaCoins</p>
                      <p className="text-sm text-gray-500">Discount coupons</p>
                    </div>
                  </button>

                  <button
                    onClick={() => coinBalance >= 500 && addTransaction('spend', 500, 'Donated to rural girl education fund', 'Donation')}
                    disabled={coinBalance < 500}
                    className="flex items-center p-6 border-2 border-green-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg"
                  >
                    <GraduationCap className="w-10 h-10 text-green-600 mr-4 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-lg">Education Fund</h3>
                      <p className="text-green-600 font-bold">-500 MaCoins</p>
                      <p className="text-sm text-gray-500">Help rural girls</p>
                    </div>
                  </button>

                  <button
                    onClick={() => coinBalance >= 100 && addTransaction('spend', 100, 'Premium wellness gift package', 'Rewards')}
                    disabled={coinBalance < 100}
                    className="flex items-center p-6 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg"
                  >
                    <Gift className="w-10 h-10 text-purple-600 mr-4 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-lg">Wellness Gifts</h3>
                      <p className="text-purple-600 font-bold">-100 MaCoins</p>
                      <p className="text-sm text-gray-500">Premium package</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Achievements Section */}
            {selectedTab === 'goals' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
                  Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        achievement.unlocked
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 shadow-lg'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-full ${
                          achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}>
                          {achievement.icon}
                        </div>
                        {achievement.unlocked && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            achievement.unlocked 
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                              : 'bg-gradient-to-r from-purple-400 to-pink-500'
                          }`}
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {achievement.progress}/{achievement.maxProgress}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Leaderboard & Transactions */}
          <div className="space-y-8">
            {/* Wellness Hero Leaderboard */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
                Wellness Heroes
              </h2>
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:scale-105 ${
                      user.name === 'You' 
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-lg' 
                        : 'bg-gray-50 hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {getRankIcon(user.rank)}
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <p className={`font-semibold ${user.name === 'You' ? 'text-purple-800' : 'text-gray-900'}`}>
                          {user.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-600">{user.state}</p>
                          <div className="flex items-center space-x-1 text-orange-500">
                            <Zap className="w-3 h-3" />
                            <span className="text-xs">{user.streak}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">{user.coins.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">MaCoins</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-6 h-6 text-gray-600 mr-2" />
                Activity Log
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'earn' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'earn' ? (
                          <Plus className="w-4 h-4 text-green-600" />
                        ) : (
                          <Minus className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{transaction.reason}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            {transaction.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(transaction.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'earn' ? '+' : '-'}{transaction.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;