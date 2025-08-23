const mongoose = require('mongoose');

const poolSchema = new mongoose.Schema({
  homeOwnerName: {
    type: String,
    required: [true, 'Home owner name is required'],
    trim: true,
    maxlength: [100, 'Home owner name cannot exceed 100 characters']
  },
  phone: {
    type: Number,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10,15}$/.test(v.toString());
      },
      message: 'Please enter a valid phone number'
    }
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [50, 'City cannot exceed 50 characters']
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
    maxlength: [50, 'State cannot exceed 50 characters']
  },
  zipCode: {
    type: Number,
    required: [true, 'Zip code is required'],
    validate: {
      validator: function(v) {
        return /^\d{5,10}$/.test(v.toString());
      },
      message: 'Please enter a valid zip code'
    }
  },
  length: {
    type: Number,
    required: [true, 'Pool length is required'],
    min: [1, 'Length must be greater than 0']
  },
  width: {
    type: Number,
    required: [true, 'Pool width is required'],
    min: [1, 'Width must be greater than 0']
  },
  gallons: {
    type: Number,
    required: [true, 'Pool gallons is required'],
    min: [1, 'Gallons must be greater than 0']
  },
  howManyInlets: {
    type: Number,
    required: [true, 'Number of inlets is required'],
    min: [0, 'Number of inlets cannot be negative']
  },
  howManySkimmers: {
    type: Number,
    required: [true, 'Number of skimmers is required'],
    min: [0, 'Number of skimmers cannot be negative']
  },
  howManyLadders: {
    type: Number,
    required: [true, 'Number of ladders is required'],
    min: [0, 'Number of ladders cannot be negative']
  },
  howManySteps: {
    type: Number,
    required: [true, 'Number of steps is required'],
    min: [0, 'Number of steps cannot be negative']
  },
  filterBrand: {
    type: String,
    trim: true,
    maxlength: [50, 'Filter brand cannot exceed 50 characters']
  },
  filterModel: {
    type: String,
    trim: true,
    maxlength: [50, 'Filter model cannot exceed 50 characters']
  },
  filterSerial: {
    type: String,
    trim: true,
    maxlength: [50, 'Filter serial cannot exceed 50 characters']
  },
  pumpBrand: {
    type: String,
    trim: true,
    maxlength: [50, 'Pump brand cannot exceed 50 characters']
  },
  pumpModel: {
    type: String,
    trim: true,
    maxlength: [50, 'Pump model cannot exceed 50 characters']
  },
  pumpSerial: {
    type: String,
    trim: true,
    maxlength: [50, 'Pump serial cannot exceed 50 characters']
  },
  heaterBrandNG: {
    type: String,
    trim: true,
    maxlength: [50, 'Heater brand NG cannot exceed 50 characters']
  },
  heaterModelNG: {
    type: String,
    trim: true,
    maxlength: [50, 'Heater model NG cannot exceed 50 characters']
  },
  heaterSerialNG: {
    type: String,
    trim: true,
    maxlength: [50, 'Heater serial NG cannot exceed 50 characters']
  },
  heaterBrandCBMS: {
    type: String,
    trim: true,
    maxlength: [50, 'Heater brand CBMS cannot exceed 50 characters']
  },
  heaterModelCBMS: {
    type: String,
    trim: true,
    maxlength: [50, 'Heater model CBMS cannot exceed 50 characters']
  },
  heaterSerialCBMS: {
    type: String,
    trim: true,
    maxlength: [50, 'Heater serial CBMS cannot exceed 50 characters']
  },
  poolCleanerBrand: {
    type: String,
    trim: true,
    maxlength: [50, 'Pool cleaner brand cannot exceed 50 characters']
  },
  poolCleanerModel: {
    type: String,
    trim: true,
    maxlength: [50, 'Pool cleaner model cannot exceed 50 characters']
  },
  poolCleanerSerial: {
    type: String,
    trim: true,
    maxlength: [50, 'Pool cleaner serial cannot exceed 50 characters']
  }
}, {
  timestamps: true
});

// Create index for better query performance
poolSchema.index({ homeOwnerName: 1, city: 1 });

module.exports = mongoose.model('Pool', poolSchema);
