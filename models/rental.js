const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    rentalDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

rentalSchema.virtual("rentalId").get(function () {
  console.log("Getting rentalId");
  return this.id.slice(-6).toUpperCase();
});

// Instance method for adding an item to a rental's order (unpaid order)
rentalSchema.methods.addItemToOrder = async function (itemId) {
  console.log("addItemToOrder");
  const rental = this;
  const Order = mongoose.model("Order");
  const order = await Order.findById(rental.order);

  // Check if the item already exists in the order's line items
  const lineItem = order.lineItems.find((lineItem) =>
    lineItem.item._id.equals(itemId)
  );

  if (lineItem) {
    // It already exists, so increase the qty
    lineItem.qty += 1;
  } else {
    // Get the item from the catalog
    const Item = mongoose.model("Item");
    const item = await Item.findById(itemId);
    // Add the item to the order's line items
    order.lineItems.push({ item });
  }

  return order.save();
};

// Instance method to set an item's qty in the rental's order (will add item if does not exist)
rentalSchema.methods.setItemQty = async function (itemId, newQty) {
  console.log("setItemQty");
  const rental = this;
  const Order = mongoose.model("Order");
  const order = await Order.findById(rental.order);

  // Find the line item in the order for the menu item
  const lineItem = order.lineItems.find((lineItem) =>
    lineItem.item._id.equals(itemId)
  );

  if (lineItem && newQty <= 0) {
    // Remove the line item from the order's line items
    const lineItemIndex = order.lineItems.indexOf(lineItem);
    order.lineItems.splice(lineItemIndex, 1);
  } else if (lineItem) {
    // Set the new qty - positive value is assured thanks to the previous if condition
    lineItem.qty = newQty;
  }

  return order.save();
};

const Rental = mongoose.model("Rental", rentalSchema);
console.log("Rental model created");

module.exports = Rental;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const rentalSchema = new Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     title: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Movie",
//       required: true,
//     },
//     rentalDate: {
//       type: Date,
//       default: Date.now,
//     },
//     returnDate: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

// rentalSchema.virtual("rentalId").get(function () {
//   return this.id.slice(-6).toUpperCase();
// });

// const Rental = mongoose.model("Rental", rentalSchema);

// module.exports = Rental;
