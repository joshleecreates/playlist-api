//
// Products
//
db = db.getSiblingDB('catalogue');
db.songs.insertMany([
  {name: "Eye of the Tiger", description: "Rock", id: "12345"},
  {name: "Bohemian Rhapsody", description: "Rock", id: "12346"},
  {name: "Stairway to Heaven", description: "Rock", id: "12347"},
  {name: "Hotel California", description: "Rock", id: "12348"},
  {name: "Sweet Child O' Mine", description: "Rock", id: "12349"},
]);

db.playlists.insertMany([
  {name: "Josh's Morning Routine", songs: ["12345", "12346", "12347"], id: "01"},
]);

// full text index for searching
db.songs.createIndex({
  name: "text",
  description: "text"
});

// unique index for product sku
db.songs.createIndex(
  { sku: 1 },
  { unique: true }
);

