package techcrunch

import org.apache.spark.sql.types.{DataTypes, StructField, StructType}

case class Investment (
                        permalink: String,
                        company: String,
                        numEmps: Option[Int],
                        category: String,
                        city: Option[String],
                        state: String,
                        fundedDate: String,
                        raisedAmt: Int,
                        raisedCurrency: String,
                        round: String
                        )

object SparkSchema {
  val permalink = StructField("permalink", DataTypes.StringType)
  val company = StructField("company", DataTypes.StringType)
  val numEmps = StructField("numEmps", DataTypes.IntegerType, nullable = true)
  val category = StructField("category", DataTypes.StringType)
  val city = StructField("city", DataTypes.StringType, nullable = true)
  val state = StructField("state", DataTypes.StringType)
  val fundedDate = StructField("fundedDate", DataTypes.StringType)
  val raisedAmt = StructField("raisedAmt", DataTypes.IntegerType)
  val raisedCurrency = StructField("raisedCurrency", DataTypes.StringType)
  val round = StructField("round", DataTypes.StringType)

  val fields = Array(permalink, company, numEmps, category, city, state, fundedDate, raisedAmt, raisedCurrency, round)
  val schema = StructType(fields)
}

