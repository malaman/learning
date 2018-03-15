package techcrunch

import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.expressions.scalalang.typed.{count => typedCount, sum => typedSum}

object Jobs {

  val FILE: String = "src/main/resources/TechCrunchcontinentalUSA.csv"

  def getTotalInvestmentByCompany(spark: SparkSession) = {
    import spark.implicits._

    val investmentData = spark.read
      .option("header", value = true)
      .schema(SparkSchema.schema)
      .csv(FILE)
      .as[Investment]

    investmentData
      .groupByKey(_.permalink)
      .agg(
        typedCount[Investment](_.permalink).name("Permalink"),
        typedSum[Investment](_.raisedAmt).name("Total Investment")
      )
      .alias("Total Investment by permalink")
      .show()
  }

}
