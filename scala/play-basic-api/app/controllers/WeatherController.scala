package controllers

import play.api.mvc._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.libs.ws._
import scala.concurrent._
import ExecutionContext.Implicits.global
import javax.inject.{Inject, Singleton}


class WeatherController @Inject() (ws: WSClient) extends Controller {

    def getWeatherForCity = Action.async {
      ws.url("http://samples.openweathermap.org/data/2.5/weather?q=Hamburg,de&appid=77061808710c76b2b3b5cd6757a5f613").get().map { response =>
        Ok(response.body)
      }
    }
}
