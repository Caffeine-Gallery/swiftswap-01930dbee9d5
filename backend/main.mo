import Text "mo:base/Text";
import Time "mo:base/Time";
import Debug "mo:base/Debug";

actor {
  // Store the current exchange rate data
  private stable var currentPair : Text = "";
  private stable var currentRate : Text = "";
  private stable var lastUpdate : Time.Time = 0;

  // Update the exchange rate data
  public func updateExchangeRate(pair: Text, rate: Text) : async () {
    currentPair := pair;
    currentRate := rate;
    lastUpdate := Time.now();
  };

  // Get the current exchange rate data
  public query func getCurrentRate() : async (Text, Text, Time.Time) {
    return (currentPair, currentRate, lastUpdate);
  };
}
