// Switch to (or create) the "contact" database.
use("contact");

// Create the "contactlist" collection and insert documents.
db.getCollection("contactlist").insertMany([
  { lastName: "Ben", firstName: "Moris", email: "ben@gmail.com", age: 26 },
  { lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 },
  {
    lastName: "Emilie",
    firstName: "brouge",
    email: "emilie.b@gmail.com",
    age: 40,
  },
  { lastName: "Alex", firstName: "brown", age: 4 },
  { lastName: "Denzel", firstName: "Washington", age: 3 },
]);

// 1. Display all of the contacts list.
print("All contacts:");
printjson(db.getCollection("contactlist").find().toArray());

// 2. Display all the information about only one person using his ID.
// For demonstration, we retrieve one document's _id from the list.
const oneContact = db.getCollection("contactlist").findOne();
print("\nDisplaying one contact by its _id:");
printjson(db.getCollection("contactlist").findOne({ _id: oneContact._id }));

// 3. Display all the contacts with an age > 18.
print("\nContacts with age > 18:");
printjson(
  db
    .getCollection("contactlist")
    .find({ age: { $gt: 18 } })
    .toArray()
);

// 4. Display all the contacts with an age > 18 and name containing 'ah'.
// Here we check if firstName or lastName contains the substring "ah" (case-insensitive).
print("\nContacts with age > 18 and name containing 'ah':");
printjson(
  db
    .getCollection("contactlist")
    .find({
      age: { $gt: 18 },
      $or: [{ firstName: /ah/i }, { lastName: /ah/i }],
    })
    .toArray()
);

// 5. Change the contact's first name from "Seif" to "Anis" for the contact with lastName "Kefi".
// (Assumes that the contact to update is uniquely identified by lastName "Kefi")
print("\nUpdating Kefi's first name from 'Seif' to 'Anis':");
db.getCollection("contactlist").updateOne(
  { lastName: "Kefi", firstName: "Seif" },
  { $set: { firstName: "Anis" } }
);
printjson(db.getCollection("contactlist").find({ lastName: "Kefi" }).toArray());

// 6. Delete the contacts that are aged under 5.
print("\nDeleting contacts with age < 5:");
db.getCollection("contactlist").deleteMany({ age: { $lt: 5 } });

// 7. Display all of the contacts list after update and deletion.
print("\nFinal contacts list:");
printjson(db.getCollection("contactlist").find().toArray());
