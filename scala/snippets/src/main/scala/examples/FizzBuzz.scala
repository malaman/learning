package snippets.examples

object FizzBuzz {

  def calculate(): Unit = {
    val result = List(1 to 100: _*).map {
      case fizzbuzz if fizzbuzz % 3 == 0 && fizzbuzz % 5 == 0 => "fizzbuzz"
      case fizz if fizz % 3 == 0 => "fizz"
      case buzz if buzz % 5 == 0 => "buzz"
      case default => default
    }
    println(result)
  }

}
