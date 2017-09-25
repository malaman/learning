
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import de.heikoseeberger.akkahttpplayjson.PlayJsonSupport._
import workers.weather.WeatherWorker
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import helpers.MongoHelpers._
import repository.MongoRepository

object Server {

  private val Port = 9000

  private def routes() =
    path("some" / LongNumber) { id =>
      get {
        println(id)
        complete(id)
      }
    }

  def main(args: Array[String]): Unit = {

    implicit val system       = ActorSystem("actor_service")
    implicit val materializer = ActorMaterializer()

    val weatherActor = system.actorOf(WeatherWorker.props, "weather-actor")
    system.scheduler.schedule(0.seconds, 5.seconds, weatherActor, WeatherWorker.GetWeather("Hamburg"))

    import system.dispatcher

    Http().bindAndHandle(routes(), "localhost", Port)
  }
}
