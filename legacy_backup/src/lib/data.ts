
export interface Team {
    id: string;
    name: string;
    shortName: string;
    color: string;
    logo: string; // We'll use a placeholder or emoji for now
    type: 'international' | 'ipl';
    strength: number; // 0-100 impact on prediction
}

export interface Venue {
    id: string;
    name: string;
    city: string;
    avgFirstInningsScore: number;
    pitchType: 'Batting' | 'Bowling' | 'Balanced';
    paceSpinBias: 'Pace' | 'Spin' | 'Neutral';
    parScore: number;
}

export interface Player {
    id: string;
    name: string;
    teamId: string;
    role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'WicketKeeper';
    image: string;
    battingAvg: number;
    strikeRate: number;
    bowlingAvg?: number;
    economy?: number;
    fantasyPointsAvg: number;
}

export const TEAMS: Team[] = [
    // International
    { id: 'ind', name: 'India', shortName: 'IND', color: '#0055A6', logo: '🇮🇳', type: 'international', strength: 95 },
    { id: 'aus', name: 'Australia', shortName: 'AUS', color: '#FFD700', logo: '🇦🇺', type: 'international', strength: 92 },
    { id: 'eng', name: 'England', shortName: 'ENG', color: '#C8102E', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', type: 'international', strength: 90 },
    { id: 'sa', name: 'South Africa', shortName: 'RSA', color: '#007749', logo: '🇿🇦', type: 'international', strength: 88 },
    { id: 'nz', name: 'New Zealand', shortName: 'NZ', color: '#000000', logo: '🇳🇿', type: 'international', strength: 87 },
    { id: 'pak', name: 'Pakistan', shortName: 'PAK', color: '#006400', logo: '🇵🇰', type: 'international', strength: 85 },
    { id: 'wi', name: 'West Indies', shortName: 'WI', color: '#7B0041', logo: '🌴', type: 'international', strength: 82 },
    { id: 'sl', name: 'Sri Lanka', shortName: 'SL', color: '#0055A6', logo: '🇱🇰', type: 'international', strength: 80 },
    { id: 'ban', name: 'Bangladesh', shortName: 'BAN', color: '#006A4E', logo: '🇧🇩', type: 'international', strength: 78 },
    { id: 'afg', name: 'Afghanistan', shortName: 'AFG', color: '#007A33', logo: '🇦🇫', type: 'international', strength: 84 },

    // IPL
    { id: 'csk', name: 'Chennai Super Kings', shortName: 'CSK', color: '#FFFF3C', logo: '🦁', type: 'ipl', strength: 94 },
    { id: 'mi', name: 'Mumbai Indians', shortName: 'MI', color: '#004BA0', logo: '🌪️', type: 'ipl', strength: 93 },
    { id: 'rcb', name: 'Royal Challengers Bangalore', shortName: 'RCB', color: '#EC1C24', logo: '🐅', type: 'ipl', strength: 89 },
    { id: 'kkr', name: 'Kolkata Knight Riders', shortName: 'KKR', color: '#3A225D', logo: '🛡️', type: 'ipl', strength: 91 },
    { id: 'gt', name: 'Gujarat Titans', shortName: 'GT', color: '#1B2133', logo: '⚡', type: 'ipl', strength: 92 },
    { id: 'srh', name: 'Sunrisers Hyderabad', shortName: 'SRH', color: '#F7A721', logo: '🦅', type: 'ipl', strength: 88 },
    { id: 'rr', name: 'Rajasthan Royals', shortName: 'RR', color: '#EA1A85', logo: '👑', type: 'ipl', strength: 90 },
    { id: 'lsg', name: 'Lucknow Super Giants', shortName: 'LSG', color: '#A0CEF8', logo: '🦸', type: 'ipl', strength: 89 },
    { id: 'dc', name: 'Delhi Capitals', shortName: 'DC', color: '#00008B', logo: '🐯', type: 'ipl', strength: 86 },
    { id: 'pbks', name: 'Punjab Kings', shortName: 'PBKS', color: '#ED1B24', logo: '🦁', type: 'ipl', strength: 85 },
];

export const VENUES: Venue[] = [
    { id: 'wankhede', name: 'Wankhede Stadium', city: 'Mumbai', avgFirstInningsScore: 185, pitchType: 'Batting', paceSpinBias: 'Pace', parScore: 190 },
    { id: 'chepauk', name: 'M. A. Chidambaram Stadium', city: 'Chennai', avgFirstInningsScore: 162, pitchType: 'Bowling', paceSpinBias: 'Spin', parScore: 170 },
    { id: 'chinnaswamy', name: 'M. Chinnaswamy Stadium', city: 'Bangalore', avgFirstInningsScore: 195, pitchType: 'Batting', paceSpinBias: 'Pace', parScore: 200 },
    { id: 'eden', name: 'Eden Gardens', city: 'Kolkata', avgFirstInningsScore: 178, pitchType: 'Balanced', paceSpinBias: 'Spin', parScore: 180 },
    { id: 'mcg', name: 'Melbourne Cricket Ground', city: 'Melbourne', avgFirstInningsScore: 160, pitchType: 'Balanced', paceSpinBias: 'Pace', parScore: 165 },
    { id: 'lords', name: "Lord's", city: 'London', avgFirstInningsScore: 155, pitchType: 'Bowling', paceSpinBias: 'Pace', parScore: 160 },
    { id: 'dubai', name: 'Dubai International Stadium', city: 'Dubai', avgFirstInningsScore: 168, pitchType: 'Balanced', paceSpinBias: 'Spin', parScore: 170 },
    { id: 'wanderers', name: 'The Wanderers Stadium', city: 'Johannesburg', avgFirstInningsScore: 175, pitchType: 'Batting', paceSpinBias: 'Pace', parScore: 180 },
];

// Mock Player Data (Condensed for brevity but sufficient for logic)
export const PLAYERS: Player[] = [
    // India
    { id: 'p1', name: 'Virat Kohli', teamId: 'ind', role: 'Batsman', image: '👑', battingAvg: 50.1, strikeRate: 138.5, fantasyPointsAvg: 75 },
    { id: 'p2', name: 'Rohit Sharma', teamId: 'ind', role: 'Batsman', image: '🏏', battingAvg: 32.5, strikeRate: 140.2, fantasyPointsAvg: 68 },
    { id: 'p3', name: 'Jasprit Bumrah', teamId: 'ind', role: 'Bowler', image: '🔥', battingAvg: 5.0, strikeRate: 80.0, bowlingAvg: 22.1, economy: 6.5, fantasyPointsAvg: 82 },
    { id: 'p4', name: 'Ravindra Jadeja', teamId: 'ind', role: 'All-Rounder', image: '⚔️', battingAvg: 28.5, strikeRate: 128.5, bowlingAvg: 28.5, economy: 7.2, fantasyPointsAvg: 70 },

    // Australia
    { id: 'p5', name: 'Travis Head', teamId: 'aus', role: 'Batsman', image: '🧢', battingAvg: 40.5, strikeRate: 155.0, fantasyPointsAvg: 78 },
    { id: 'p6', name: 'Pat Cummins', teamId: 'aus', role: 'Bowler', image: '🎯', battingAvg: 15.0, strikeRate: 110.0, bowlingAvg: 24.5, economy: 7.8, fantasyPointsAvg: 72 },

    // CSK
    { id: 'p7', name: 'MS Dhoni', teamId: 'csk', role: 'WicketKeeper', image: '🧤', battingAvg: 39.5, strikeRate: 135.5, fantasyPointsAvg: 55 },
    { id: 'p8', name: 'Ruturaj Gaikwad', teamId: 'csk', role: 'Batsman', image: '🦁', battingAvg: 42.1, strikeRate: 136.0, fantasyPointsAvg: 65 },

    // RCB
    { id: 'p9', name: 'Faf du Plessis', teamId: 'rcb', role: 'Batsman', image: '💪', battingAvg: 35.5, strikeRate: 142.0, fantasyPointsAvg: 62 },
    { id: 'p10', name: 'Glenn Maxwell', teamId: 'rcb', role: 'All-Rounder', image: '💥', battingAvg: 28.5, strikeRate: 158.5, bowlingAvg: 35.0, economy: 8.5, fantasyPointsAvg: 60 },
    { id: 'p11', name: 'Mohammed Siraj', teamId: 'rcb', role: 'Bowler', image: '🏎️', battingAvg: 5.0, strikeRate: 50.0, bowlingAvg: 20.0, economy: 7.5, fantasyPointsAvg: 58 },

    // MI
    { id: 'p12', name: 'Hardik Pandya', teamId: 'mi', role: 'All-Rounder', image: '🏏', battingAvg: 30.1, strikeRate: 145.0, bowlingAvg: 28.0, economy: 8.9, fantasyPointsAvg: 70 },
    { id: 'p13', name: 'Suryakumar Yadav', teamId: 'mi', role: 'Batsman', image: '☀️', battingAvg: 35.0, strikeRate: 170.0, fantasyPointsAvg: 80 },
    { id: 'p14', name: 'Jasprit Bumrah', teamId: 'mi', role: 'Bowler', image: '🔥', battingAvg: 5.0, strikeRate: 80.0, bowlingAvg: 22.1, economy: 6.5, fantasyPointsAvg: 85 },

    // Generic Filler Players for Demo
    { id: 'p15', name: 'Shubman Gill', teamId: 'gt', role: 'Batsman', image: '⭐', battingAvg: 45.0, strikeRate: 135.0, fantasyPointsAvg: 72 },
    { id: 'p16', name: 'Rashid Khan', teamId: 'gt', role: 'Bowler', image: '🌪️', battingAvg: 15.0, strikeRate: 150.0, bowlingAvg: 18.0, economy: 6.0, fantasyPointsAvg: 88 },
    { id: 'p17', name: 'David Warner', teamId: 'dc', role: 'Batsman', image: '🐂', battingAvg: 40.0, strikeRate: 140.0, fantasyPointsAvg: 68 },
    { id: 'p18', name: 'Rishabh Pant', teamId: 'dc', role: 'WicketKeeper', image: '🕷️', battingAvg: 34.0, strikeRate: 148.0, fantasyPointsAvg: 65 },
    { id: 'p19', name: 'Andre Russell', teamId: 'kkr', role: 'All-Rounder', image: '💪', battingAvg: 29.0, strikeRate: 175.0, bowlingAvg: 26.0, economy: 9.5, fantasyPointsAvg: 78 },
    { id: 'p20', name: 'Sunil Narine', teamId: 'kkr', role: 'All-Rounder', image: '🧙‍♂️', battingAvg: 15.0, strikeRate: 160.0, bowlingAvg: 22.0, economy: 6.5, fantasyPointsAvg: 76 },
    { id: 'p21', name: 'Sanju Samson', teamId: 'rr', role: 'WicketKeeper', image: '🧤', battingAvg: 36.0, strikeRate: 138.0, fantasyPointsAvg: 64 },
    { id: 'p22', name: 'Jos Buttler', teamId: 'rr', role: 'Batsman', image: '🚀', battingAvg: 38.0, strikeRate: 145.0, fantasyPointsAvg: 75 },
    { id: 'p23', name: 'Trent Boult', teamId: 'rr', role: 'Bowler', image: '⚡', battingAvg: 8.0, strikeRate: 90.0, bowlingAvg: 25.0, economy: 7.8, fantasyPointsAvg: 58 },
    { id: 'p24', name: 'KL Rahul', teamId: 'lsg', role: 'Batsman', image: '🧢', battingAvg: 45.0, strikeRate: 132.0, fantasyPointsAvg: 70 },
    { id: 'p25', name: 'Nicholas Pooran', teamId: 'lsg', role: 'Batsman', image: '🔥', battingAvg: 28.0, strikeRate: 160.0, fantasyPointsAvg: 60 },
];
