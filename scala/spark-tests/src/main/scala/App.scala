package sparkexamples

import org.apache.spark.sql.SparkSession
import org.apache.spark.SparkConf
import scala.io.Source

object App {

  def main(args : Array[String]): Unit = {
    val conf: SparkConf = new SparkConf()
      .setAppName("SparkTests")
      .setMaster("local")
    val spark = SparkSession.builder()
      .config(conf)
      .getOrCreate()

    val salesData = spark.read
      .option("header", true)
      .csv("src/main/resources/SalesJan2009.csv")

    salesData.printSchema()
    spark.stop()
  }
}
