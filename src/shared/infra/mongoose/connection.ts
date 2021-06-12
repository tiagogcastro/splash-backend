import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://Gustavo:Gk14Wgb3ElNCc72v@lavimco-cluster-0.lkknp.mongodb.net/NotificationsAndroid?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    },
  )
  .then(() => {
    console.log('🚀 Mongoose is connected');
  })
  .catch(error => {
    console.log(`⚠️ Houve um erro ao se conectar ao mongodb: \n\n${error}`);
  });
