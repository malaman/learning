package repository

import org.mongodb.scala._


object MongoRepository {
  val mongoClient: MongoClient = MongoClient("mongodb://localhost:27020")
  val database: MongoDatabase = mongoClient.getDatabase("akka-demos")
  val weatherCollection: MongoCollection[Document] = database.getCollection("weather")
}

class MongoRepository {

}
