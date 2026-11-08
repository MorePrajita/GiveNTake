// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import http from 'http';
// import { Server } from 'socket.io';
// import pool from './db.js';

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Setup HTTP server and Socket.io
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' }
// });

// // Socket.io connection handling
// io.on('connection', (socket) => {
//   console.log('A user connected to chat:', socket.id);

//   socket.on('join_room', (room) => {
//     socket.join(room);
//     console.log(`User joined room: ${room}`);
//   });

//   socket.on('send_message', async (data) => {
//     const { sender_prn, receiver_prn, listing_id, message_text, room } = data;
    
//     try {
//       await pool.query(
//         `INSERT INTO Message (sender_prn, receiver_prn, listing_id, message_text) VALUES (?, ?, ?, ?)`,
//         [sender_prn, receiver_prn, listing_id, message_text]
//       );

//       io.to(room).emit('receive_message', data);
//     } catch (err) {
//       console.error('Failed to save message:', err);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // ==================== AUTH ROUTES ====================

// app.post('/api/auth/register', async (req, res) => {
//   const { prn, name, email, password, department, year } = req.body;
  
//   try {
//     const [validCheck] = await pool.query('SELECT * FROM valid_prns WHERE prn = ?', [prn]);
//     if (validCheck.length === 0) {
//       return res.status(400).json({ error: 'Unauthorized PRN. This PRN is not registered in college records.' });
//     }

//     const [existingUser] = await pool.query('SELECT * FROM User WHERE prn = ?', [prn]);
//     if (existingUser.length > 0) {
//       return res.status(400).json({ error: 'An account with this PRN already exists.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await pool.query(
//       `INSERT INTO User (prn, name, email, password, department, year) VALUES (?, ?, ?, ?, ?, ?)`,
//       [prn, name, email, hashedPassword, department, year]
//     );

//     const token = jwt.sign({ prn, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.status(201).json({ message: 'Account created successfully', token, user: { prn, name, email, department, year } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error during registration' });
//   }
// });

// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const [users] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
//     if (users.length === 0) {
//       return res.status(400).json({ error: 'Invalid college email or password.' });
//     }

//     const user = users[0];
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid college email or password.' });
//     }

//     const token = jwt.sign({ prn: user.prn, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.json({ message: 'Logged in successfully', token, user: { prn: user.prn, name: user.name, email: user.email, department: user.department, year: user.year } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error during login' });
//   }
// });


// // ==================== MARKETPLACE ROUTES ====================

// app.get('/api/categories', async (req, res) => {
//   try {
//     const [categories] = await pool.query('SELECT * FROM Category');
//     res.json(categories);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch categories' });
//   }
// });

// app.get('/api/listings', async (req, res) => {
//   const { category_id, search } = req.query;
//   try {
//     let query = `
//       SELECT l.*, u.name as seller_name, u.department as seller_dept, c.name as category_name 
//       FROM Listing l
//       JOIN User u ON l.seller_prn = u.prn
//       JOIN Category c ON l.category_id = c.category_id
//       WHERE l.status = 'active'
//     `;
//     const params = [];

//     if (category_id) {
//       query += ` AND l.category_id = ?`;
//       params.push(category_id);
//     }

//     if (search) {
//       query += ` AND (l.title LIKE ? OR l.description LIKE ?)`;
//       params.push(`%${search}%`, `%${search}%`);
//     }

//     query += ` ORDER BY l.created_at DESC`;

//     const [listings] = await pool.query(query, params);
//     res.json(listings);
//   } catch (err) {
//     console.error('Error fetching listings feed:', err);
//     res.status(500).json({ error: 'Failed to fetch listings', details: err.message });
//   }
// });

// app.post('/api/listings', async (req, res) => {
//   const { seller_prn, category_id, title, description, price, original_price, item_condition, photo_url, meetup_location } = req.body;

//   try {
//     await pool.query(
//       `INSERT INTO Listing (seller_prn, category_id, title, description, price, original_price, item_condition, photo_url, meetup_location, status) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
//       [seller_prn, category_id, title, description, price, original_price || null, item_condition || 'Good', photo_url || null, meetup_location || 'Main Library']
//     );
//     res.status(201).json({ message: 'Listing created successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to create listing' });
//   }
// });

// app.get('/api/listings/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await pool.query(
//       `SELECT l.*, u.name as seller_name, u.department as seller_dept, u.year as seller_year, u.email as seller_email, c.name as category_name 
//        FROM Listing l
//        JOIN User u ON l.seller_prn = u.prn
//        JOIN Category c ON l.category_id = c.category_id
//        WHERE l.listing_id = ?`,
//       [id]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ error: 'Listing not found' });
//     }

//     res.json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch listing details' });
//   }
// });


// // ==================== USER PROFILE & LISTING MANAGEMENT ====================

// app.get('/api/users/:prn', async (req, res) => {
//   const { prn } = req.params;
//   try {
//     const [users] = await pool.query(
//       'SELECT prn, name, email, department, year, created_at FROM User WHERE prn = ?',
//       [prn]
//     );

//     if (users.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(users[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch user profile' });
//   }
// });

// app.get('/api/users/:prn/listings', async (req, res) => {
//   const { prn } = req.params;
//   try {
//     const [listings] = await pool.query(
//       `SELECT l.*, c.name as category_name 
//        FROM Listing l 
//        JOIN Category c ON l.category_id = c.category_id 
//        WHERE l.seller_prn = ? 
//        ORDER BY l.created_at DESC`,
//       [prn]
//     );
//     res.json(listings);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch user listings' });
//   }
// });

// app.patch('/api/listings/:id/status', async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   try {
//     await pool.query('UPDATE Listing SET status = ? WHERE listing_id = ?', [status, id]);
//     res.json({ message: `Listing status updated to ${status}` });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to update listing status' });
//   }
// });

// app.delete('/api/listings/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     await pool.query('DELETE FROM Listing WHERE listing_id = ?', [id]);
//     res.json({ message: 'Listing deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to delete listing' });
//   }
// });


// // ==================== WISHLIST ROUTES ====================

// app.get('/api/wishlist/:prn/ids', async (req, res) => {
//   const { prn } = req.params;
//   try {
//     const [rows] = await pool.query('SELECT listing_id FROM Wishlist WHERE user_prn = ?', [prn]);
//     const ids = rows.map(r => r.listing_id);
//     res.json(ids);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch wishlist IDs' });
//   }
// });

// app.get('/api/wishlist/:prn', async (req, res) => {
//   const { prn } = req.params;
//   try {
//     const [listings] = await pool.query(
//       `SELECT 
//         l.listing_id, 
//         l.title, 
//         l.description, 
//         l.price, 
//         l.original_price, 
//         l.item_condition, 
//         l.photo_url, 
//         l.status, 
//         l.created_at, 
//         COALESCE(c.name, 'General') as category_name, 
//         COALESCE(u.name, 'Campus Student') as seller_name, 
//         COALESCE(u.department, 'General') as seller_dept
//        FROM Wishlist w
//        JOIN Listing l ON w.listing_id = l.listing_id
//        LEFT JOIN Category c ON l.category_id = c.category_id
//        LEFT JOIN User u ON l.seller_prn = u.prn
//        WHERE w.user_prn = ? AND l.status = 'active'
//        ORDER BY l.created_at DESC`,
//       [prn]
//     );
//     res.json(listings);
//   } catch (err) {
//     console.error('Error fetching wishlist:', err);
//     res.status(500).json({ error: 'Failed to fetch saved listings' });
//   }
// });

// app.post('/api/wishlist/toggle', async (req, res) => {
//   const { user_prn, listing_id } = req.body;

//   if (!user_prn || !listing_id) {
//     return res.status(400).json({ error: 'User PRN and Listing ID are required' });
//   }

//   try {
//     const [existing] = await pool.query(
//       'SELECT * FROM Wishlist WHERE user_prn = ? AND listing_id = ?',
//       [user_prn, listing_id]
//     );

//     if (existing.length > 0) {
//       await pool.query('DELETE FROM Wishlist WHERE user_prn = ? AND listing_id = ?', [user_prn, listing_id]);
//       return res.json({ saved: false, message: 'Removed from saved items' });
//     } else {
//       await pool.query('INSERT INTO Wishlist (user_prn, listing_id) VALUES (?, ?)', [user_prn, listing_id]);
//       return res.json({ saved: true, message: 'Added to saved items' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to toggle wishlist' });
//   }
// });


// // ==================== CHAT MESSAGES ROUTE ====================

// app.get('/api/messages/:listing_id/:user1/:user2', async (req, res) => {
//   const { listing_id, user1, user2 } = req.params;
//   try {
//     const [messages] = await pool.query(
//       `SELECT * FROM Message 
//        WHERE listing_id = ? AND ((sender_prn = ? AND receiver_prn = ?) OR (sender_prn = ? AND receiver_prn = ?))
//        ORDER BY sent_at ASC`,
//       [listing_id, user1, user2, user2, user1]
//     );
//     res.json(messages);
//   } catch (err) {
//     console.error('SQL Error fetching messages:', err);
//     res.status(500).json({ error: 'Failed to fetch messages', details: err.message });
//   }
// });

// // ==================== ADMIN ROUTES ====================

// app.get('/api/admin/stats', async (req, res) => {
//   try {
//     const [userRows] = await pool.query('SELECT COUNT(*) as count FROM User');
//     const [listingRows] = await pool.query('SELECT COUNT(*) as count FROM Listing WHERE status = "active"');
//     res.json({
//       users: userRows[0].count,
//       listings: listingRows[0].count,
//       reports: 1
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch admin stats' });
//   }
// });

// app.get('/api/admin/users', async (req, res) => {
//   try {
//     const [users] = await pool.query('SELECT prn, name, email, department, year FROM User');
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

// app.get('/api/admin/flagged-listings', async (req, res) => {
//   try {
//     // For demonstration, fetch listings or flagged mock items
//     const [listings] = await pool.query('SELECT listing_id, title, status FROM Listing LIMIT 3');
//     const formatted = listings.map(l => ({ ...l, reporter: 'Sneha P.' }));
//     res.json(formatted);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch flagged listings' });
//   }
// });

// app.post('/api/admin/listings/:id/moderate', async (req, res) => {
//   const { id } = req.params;
//   const { action } = req.body; // 'approve' or 'remove'
//   try {
//     if (action === 'remove') {
//       await pool.query('DELETE FROM Listing WHERE listing_id = ?', [id]);
//     } else {
//       await pool.query('UPDATE Listing SET status = "active" WHERE listing_id = ?', [id]);
//     }
//     res.json({ message: `Listing successfully ${action}d` });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to moderate listing' });
//   }
// });

// app.post('/api/admin/categories', async (req, res) => {
//   const { name } = req.body;
//   try {
//     await pool.query('INSERT INTO Category (name) VALUES (?)', [name]);
//     res.status(201).json({ message: 'Category added successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to add category' });
//   }
// });

// // ==================== ADMIN LOGIN ROUTE ====================

// app.post('/api/admin/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const [admins] = await pool.query('SELECT * FROM Admin WHERE email = ?', [email]);
//     if (admins.length === 0) {
//       return res.status(401).json({ error: 'Invalid admin email or password' });
//     }

//     const admin = admins[0];
//     // In production use bcrypt, for project prototype direct comparison or simple match:
//     if (admin.password !== password) {
//       return res.status(401).json({ error: 'Invalid admin email or password' });
//     }

//     res.json({
//       message: 'Admin login successful',
//       admin: { admin_id: admin.admin_id, name: admin.name, email: admin.email, role: admin.role }
//     });
//   } catch (err) {
//     console.error('Admin login error:', err);
//     res.status(500).json({ error: 'Server error during admin login' });
//   }
// });

// // ==================== LIVE ADMIN ANALYTICS ROUTE ====================

// app.get('/api/admin/analytics', async (req, res) => {
//   try {
//     // 1. Total registered users
//     const [userRows] = await pool.query('SELECT COUNT(*) as count FROM User');
    
//     // 2. Total active listings
//     const [activeListingRows] = await pool.query('SELECT COUNT(*) as count FROM Listing WHERE status = "active"');
    
//     // 3. Total sold items & estimated trade volume
//     const [soldRows] = await pool.query('SELECT COUNT(*) as count, SUM(price) as totalVolume FROM Listing WHERE status = "sold"');
    
//     // 4. Category breakdown (listings count & sold count per category)
//     const [categoryStats] = await pool.query(`
//       SELECT c.name as category_name, 
//              COUNT(l.listing_id) as total_listings,
//              SUM(CASE WHEN l.status = 'sold' THEN 1 ELSE 0 END) as sold_count
//       FROM Category c
//       LEFT JOIN Listing l ON c.category_id = l.category_id
//       GROUP BY c.category_id, c.name
//     `);

//     // 5. Most active users (top sellers by number of listings posted)
//     const [topUsers] = await pool.query(`
//       SELECT u.prn, u.name, u.department, 
//              COUNT(l.listing_id) as listingsCount,
//              SUM(CASE WHEN l.status = 'sold' THEN 1 ELSE 0 END) as soldCount
//       FROM User u
//       LEFT JOIN Listing l ON u.prn = l.seller_prn
//       GROUP BY u.prn, u.name, u.department
//       ORDER BY listingsCount DESC
//       LIMIT 4
//     `);

//     res.json({
//       totalUsers: userRows[0].count,
//       activeListings: activeListingRows[0].count,
//       totalSold: soldRows[0].count || 0,
//       totalVolume: soldRows[0].totalVolume ? `₹${soldRows[0].totalVolume}` : '₹0',
//       categoryData: categoryStats,
//       topUsers: topUsers
//     });
//   } catch (err) {
//     console.error('Analytics error:', err);
//     res.status(500).json({ error: 'Failed to fetch live analytics' });
//   }
// });
// // ==================== START SERVER ====================
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`GiveNTake backend server running on port ${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import http from 'http';
import { Server } from 'socket.io';
import pool from './db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Setup HTTP server and Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected to chat:', socket.id);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('send_message', async (data) => {
    const { sender_prn, receiver_prn, listing_id, message_text, room } = data;
    
    try {
      await pool.query(
        `INSERT INTO Message (sender_prn, receiver_prn, listing_id, message_text) VALUES (?, ?, ?, ?)`,
        [sender_prn, receiver_prn, listing_id, message_text]
      );

      io.to(room).emit('receive_message', data);
    } catch (err) {
      console.error('Failed to save message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// ==================== AUTH ROUTES ====================

app.post('/api/auth/register', async (req, res) => {
  const { prn, name, email, password, department, year } = req.body;
  
  try {
    const [validCheck] = await pool.query('SELECT * FROM valid_prns WHERE prn = ?', [prn]);
    if (validCheck.length === 0) {
      return res.status(400).json({ error: 'Unauthorized PRN. This PRN is not registered in college records.' });
    }

    const [existingUser] = await pool.query('SELECT * FROM User WHERE prn = ?', [prn]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'An account with this PRN already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO User (prn, name, email, password, department, year) VALUES (?, ?, ?, ?, ?, ?)`,
      [prn, name, email, hashedPassword, department, year]
    );

    const token = jwt.sign({ prn, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Account created successfully', token, user: { prn, name, email, department, year } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// UNIFIED LOGIN ROUTE (Handles both Students and Admins)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check Admin table first
    const [admins] = await pool.query('SELECT * FROM Admin WHERE email = ?', [email]);
    if (admins.length > 0) {
      const admin = admins[0];
      if (admin.password === password) {
        const token = jwt.sign({ admin_id: admin.admin_id, email: admin.email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.json({
          message: 'Admin login successful',
          token,
          user: { admin_id: admin.admin_id, name: admin.name, email: admin.email, role: 'admin' }
        });
      }
    }

    // 2. Check Student User table
    const [users] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ error: 'Invalid college email or password.' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid college email or password.' });
    }

    const token = jwt.sign({ prn: user.prn, email: user.email, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      message: 'Logged in successfully', 
      token, 
      user: { prn: user.prn, name: user.name, email: user.email, department: user.department, year: user.year, role: 'student' } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
});


// ==================== MARKETPLACE ROUTES ====================

app.get('/api/categories', async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM Category');
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/listings', async (req, res) => {
  const { category_id, search } = req.query;
  try {
    let query = `
      SELECT l.*, u.name as seller_name, u.department as seller_dept, c.name as category_name 
      FROM Listing l
      JOIN User u ON l.seller_prn = u.prn
      JOIN Category c ON l.category_id = c.category_id
      WHERE l.status = 'active'
    `;
    const params = [];

    if (category_id) {
      query += ` AND l.category_id = ?`;
      params.push(category_id);
    }

    if (search) {
      query += ` AND (l.title LIKE ? OR l.description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY l.created_at DESC`;

    const [listings] = await pool.query(query, params);
    res.json(listings);
  } catch (err) {
    console.error('Error fetching listings feed:', err);
    res.status(500).json({ error: 'Failed to fetch listings', details: err.message });
  }
});

app.post('/api/listings', async (req, res) => {
  const { seller_prn, category_id, title, description, price, original_price, item_condition, photo_url, meetup_location } = req.body;

  try {
    await pool.query(
      `INSERT INTO Listing (seller_prn, category_id, title, description, price, original_price, item_condition, photo_url, meetup_location, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [seller_prn, category_id, title, description, price, original_price || null, item_condition || 'Good', photo_url || null, meetup_location || 'Main Library']
    );
    res.status(201).json({ message: 'Listing created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

app.get('/api/listings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT l.*, u.name as seller_name, u.department as seller_dept, u.year as seller_year, u.email as seller_email, c.name as category_name 
       FROM Listing l
       JOIN User u ON l.seller_prn = u.prn
       JOIN Category c ON l.category_id = c.category_id
       WHERE l.listing_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch listing details' });
  }
});


// ==================== USER PROFILE & LISTING MANAGEMENT ====================

app.get('/api/users/:prn', async (req, res) => {
  const { prn } = req.params;
  try {
    const [users] = await pool.query(
      'SELECT prn, name, email, department, year, created_at FROM User WHERE prn = ?',
      [prn]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

app.get('/api/users/:prn/listings', async (req, res) => {
  const { prn } = req.params;
  try {
    const [listings] = await pool.query(
      `SELECT l.*, c.name as category_name 
       FROM Listing l 
       JOIN Category c ON l.category_id = c.category_id 
       WHERE l.seller_prn = ? 
       ORDER BY l.created_at DESC`,
      [prn]
    );
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user listings' });
  }
});

app.patch('/api/listings/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await pool.query('UPDATE Listing SET status = ? WHERE listing_id = ?', [status, id]);
    res.json({ message: `Listing status updated to ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update listing status' });
  }
});

app.delete('/api/listings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM Listing WHERE listing_id = ?', [id]);
    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete listing' });
  }
});


// ==================== WISHLIST ROUTES ====================

app.get('/api/wishlist/:prn/ids', async (req, res) => {
  const { prn } = req.params;
  try {
    const [rows] = await pool.query('SELECT listing_id FROM Wishlist WHERE user_prn = ?', [prn]);
    const ids = rows.map(r => r.listing_id);
    res.json(ids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch wishlist IDs' });
  }
});

app.get('/api/wishlist/:prn', async (req, res) => {
  const { prn } = req.params;
  try {
    const [listings] = await pool.query(
      `SELECT 
        l.listing_id, 
        l.title, 
        l.description, 
        l.price, 
        l.original_price, 
        l.item_condition, 
        l.photo_url, 
        l.status, 
        l.created_at, 
        COALESCE(c.name, 'General') as category_name, 
        COALESCE(u.name, 'Campus Student') as seller_name, 
        COALESCE(u.department, 'General') as seller_dept
       FROM Wishlist w
       JOIN Listing l ON w.listing_id = l.listing_id
       LEFT JOIN Category c ON l.category_id = c.category_id
       LEFT JOIN User u ON l.seller_prn = u.prn
       WHERE w.user_prn = ? AND l.status = 'active'
       ORDER BY l.created_at DESC`,
      [prn]
    );
    res.json(listings);
  } catch (err) {
    console.error('Error fetching wishlist:', err);
    res.status(500).json({ error: 'Failed to fetch saved listings' });
  }
});

app.post('/api/wishlist/toggle', async (req, res) => {
  const { user_prn, listing_id } = req.body;

  if (!user_prn || !listing_id) {
    return res.status(400).json({ error: 'User PRN and Listing ID are required' });
  }

  try {
    const [existing] = await pool.query(
      'SELECT * FROM Wishlist WHERE user_prn = ? AND listing_id = ?',
      [user_prn, listing_id]
    );

    if (existing.length > 0) {
      await pool.query('DELETE FROM Wishlist WHERE user_prn = ? AND listing_id = ?', [user_prn, listing_id]);
      return res.json({ saved: false, message: 'Removed from saved items' });
    } else {
      await pool.query('INSERT INTO Wishlist (user_prn, listing_id) VALUES (?, ?)', [user_prn, listing_id]);
      return res.json({ saved: true, message: 'Added to saved items' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to toggle wishlist' });
  }
});


// ==================== CHAT MESSAGES ROUTE ====================

app.get('/api/messages/:listing_id/:user1/:user2', async (req, res) => {
  const { listing_id, user1, user2 } = req.params;
  try {
    const [messages] = await pool.query(
      `SELECT * FROM Message 
       WHERE listing_id = ? AND ((sender_prn = ? AND receiver_prn = ?) OR (sender_prn = ? AND receiver_prn = ?))
       ORDER BY sent_at ASC`,
      [listing_id, user1, user2, user2, user1]
    );
    res.json(messages);
  } catch (err) {
    console.error('SQL Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages', details: err.message });
  }
});

// ==================== ADMIN ROUTES ====================

app.get('/api/admin/stats', async (req, res) => {
  try {
    const [userRows] = await pool.query('SELECT COUNT(*) as count FROM User');
    const [listingRows] = await pool.query('SELECT COUNT(*) as count FROM Listing WHERE status = "active"');
    res.json({
      users: userRows[0].count,
      listings: listingRows[0].count,
      reports: 1
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

app.get('/api/admin/users', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT prn, name, email, department, year FROM User');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/admin/flagged-listings', async (req, res) => {
  try {
    const [listings] = await pool.query('SELECT listing_id, title, status FROM Listing LIMIT 3');
    const formatted = listings.map(l => ({ ...l, reporter: 'Sneha P.' }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flagged listings' });
  }
});

app.post('/api/admin/listings/:id/moderate', async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; 
  try {
    if (action === 'remove') {
      await pool.query('DELETE FROM Listing WHERE listing_id = ?', [id]);
    } else {
      await pool.query('UPDATE Listing SET status = "active" WHERE listing_id = ?', [id]);
    }
    res.json({ message: `Listing successfully ${action}d` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to moderate listing' });
  }
});

app.post('/api/admin/categories', async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query('INSERT INTO Category (name) VALUES (?)', [name]);
    res.status(201).json({ message: 'Category added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add category' });
  }
});

// ==================== LIVE ADMIN ANALYTICS ROUTE ====================

app.get('/api/admin/analytics', async (req, res) => {
  try {
    const [userRows] = await pool.query('SELECT COUNT(*) as count FROM User');
    const [activeListingRows] = await pool.query('SELECT COUNT(*) as count FROM Listing WHERE status = "active"');
    const [soldRows] = await pool.query('SELECT COUNT(*) as count, SUM(price) as totalVolume FROM Listing WHERE status = "sold"');
    
    const [categoryStats] = await pool.query(`
      SELECT c.name as category_name, 
             COUNT(l.listing_id) as total_listings,
             SUM(CASE WHEN l.status = 'sold' THEN 1 ELSE 0 END) as sold_count
      FROM Category c
      LEFT JOIN Listing l ON c.category_id = l.category_id
      GROUP BY c.category_id, c.name
    `);

    const [topUsers] = await pool.query(`
      SELECT u.prn, u.name, u.department, 
             COUNT(l.listing_id) as listingsCount,
             SUM(CASE WHEN l.status = 'sold' THEN 1 ELSE 0 END) as soldCount
      FROM User u
      LEFT JOIN Listing l ON u.prn = l.seller_prn
      GROUP BY u.prn, u.name, u.department
      ORDER BY listingsCount DESC
      LIMIT 4
    `);

    res.json({
      totalUsers: userRows[0].count,
      activeListings: activeListingRows[0].count,
      totalSold: soldRows[0].count || 0,
      totalVolume: soldRows[0].totalVolume ? `₹${soldRows[0].totalVolume}` : '₹0',
      categoryData: categoryStats,
      topUsers: topUsers
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to fetch live analytics' });
  }
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`GiveNTake backend server running on port ${PORT}`);
});