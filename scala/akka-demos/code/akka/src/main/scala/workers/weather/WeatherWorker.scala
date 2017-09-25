package workers.weather

import akka.actor._

object WeatherWorker {
  def props = Props[WeatherWorker]
  case class GetWeather(city: String)
}

class WeatherWorker extends Actor {
  import WeatherWorker._

  def receive = {
    case GetWeather(city: String) => {
      println(s"GetWeather for ${city}")
    }
  }
}
