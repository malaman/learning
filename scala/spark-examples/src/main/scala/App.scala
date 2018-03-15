import org.apache.spark.sql.SparkSession
import org.apache.spark.SparkConf
import techcrunch.{Jobs => TechCrunchJobs}

object App {

  def main(args : Array[String]): Unit = {
    val conf: SparkConf = new SparkConf()
      .setAppName("SparkTests")
      .setMaster("local")
    val spark = SparkSession.builder()
      .config(conf)
      .getOrCreate()

    TechCrunchJobs.getTotalInvestmentByCompany(spark)

    spark.stop()
  }
}
