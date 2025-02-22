import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subscription name is required"],
            trim: true,
            minlength: [
                3,
                "Subscription name must be at least 3 characters long",
            ],
            maxlength: [
                100,
                "Subscription name must be less than 50 characters",
            ],
        },
        price: {
            type: Number,
            required: [true, "Subscription price is required"],
            min: [0, "Subscription price must be greater than 0"],
        },
        currency: {
            type: String,
            enum: [
                "USD",
                "EUR",
                "GBP",
                "CAD",
                "AUD",
                "NZD",
                "CHF",
                "JPY",
                "CNY",
                "INR",
                "BDT",
            ],
            default: "USD",
        },
        frequency: {
            type: String,
            enum: ["daily", "weekly", "monthly", "yearly"],
            default: "monthly",
        },
        category: {
            type: String,
            enum: [
                "food",
                "entertainment",
                "shopping",
                "other",
                "sport",
                "transportation",
                "health",
                "education",
                "bills",
                "other",
            ],
            required: [true, "Subscription category is required"],
        },
        paymentMethod: {
            type: String,
            enum: [
                "credit card",
                "debit card",
                "paypal",
                "bank transfer",
                "other",
            ],
            required: [true, "Subscription payment method is required"],
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "expired", "cancelled"],
            default: "active",
        },
        startDate: {
            type: Date,
            required: [true, "Subscription start date is required"],
            validate: {
                validator: (value) => value <= new Date(),
                message: "Start date must be in the past",
            },
        },
        renewalDate: {
            type: Date,
            // required: [true, "Subscription renew date is required"],
            validate: {
                validator: function (value) {
                    return value > this.startDate;
                },
                message: "Renewal date must be after start date",
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Subscription user is required"],
            index: true,
        },
    },
    { timestamps: true }
);

// Auto calculate renewal date if it is not provided
subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        const renewalPeriod = renewalPeriods[this.frequency];
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod);
    }

    // Auto update status to expired if renewal date is in the past
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
