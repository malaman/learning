
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import de.heikoseeberger.akkahttpplayjson.PlayJsonSupport._

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

    import system.dispatcher

    Http().bindAndHandle(routes(), "localhost", Port)
  }
}
