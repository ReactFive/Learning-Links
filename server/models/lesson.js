var mongoose = require('mongoose');

var lessonSchema = new mongoose.Schema ({
  title   :
  {
    type      : String,
    required  : true,
    trim      : true
  },
  url   :
  {
    type      : String,
    required  : true,
    index     : true
  },
  created_at  :
  {
    type      : Date,
    default   : Date.now,
    required  : true
  },
  publish     :
  { 
    type      : Boolean,
    default   : true
  },
  comments    : [{
    marked_at :
    {
      type    : Number,
      required: true
    },
    author    : String,
    text      :
    {
      type    : String,
      trim    : true,
      max     : 180
    },
    votes     : 
    {
      type   : Number,
      default : 0
    },
    star      : 
    {
      type    : Boolean,
      default : false
    },
    responses   :
    [{
      author    : String,
      text      :
      {
        type    : String,
        trim    : true,
        max     : 180
      },
      votes     : 
      {
      type   : Number,
      default : 0
      },
      star      : 
      {
        type    : Boolean,
        default : false
      }
    }]
  }],
  teacher      :
  {
    id        :
    {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : 'User'
    },
    name      : String
  }
});

lessonSchema.virtual('hasComments').get(function(){
  return this.comments.length > 0;
});

lessonSchema.virtual('localDate').get(function(){
  if(this.date) {
    return this.date.toLocaleString();
  }
});

lessonSchema.post('save', function(){
  console.log("lesson was saved!");
});

lessonSchema.set('toJSON', { getters: true, virtuals: true });
lessonSchema.set('toObject', { getters: true, virtuals: true });

var Lesson = mongoose.model("Lesson", lessonSchema);

function createSeedLesson() {
  Lesson.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      Lesson.create({
        title: "default lesson",
        url: "https://www.youtube.com/watch?v=pw1DeLy2Xsw",
        teacher: {
          id: "54ff4ed8476278905d04a1e6",
          name: "Rick"
        },
        comments: [{
          marked_at : 13.345,
          author    : "Abhi",
          text      : "I didn't really get what you are doing with that for loop?"
        }]
      });
    }
  });
}

exports.createSeedLesson = createSeedLesson;