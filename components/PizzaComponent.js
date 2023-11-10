import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useState } from "react";
import { CartItems } from "../Context";
import Toast from "react-native-root-toast";

const PizzaComponent = ({ pizza }) => {
  const data = [pizza];
  // console.log("data",data);
  const options = ["medium"];
  const { cart, setCart } = useContext(CartItems);
  const [selected, setSelected] = useState(false);
  const [size,setSize] = useState('Medium')
  const [additems, setAddItems] = useState(0);
  const addToCart = () => {
    setSelected(true);

    if (additems === 0) {
      setAddItems(1);
    }

    const ItemPresent = cart.find((item) => item.id === pizza.id);
    if (ItemPresent) {
      setCart(
        cart.map((x) =>
          x.id === pizza.id
            ? { ...ItemPresent, quantity: ItemPresent.quantity + 1 }
            : x
        )
      );
    } else {
      setCart([...cart, { ...pizza,quantity: 1,size:size }]);
    }
    let toast = Toast.show("Adicionado", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
    setTimeout(function () {
      Toast.hide(toast);
    }, 2500);
    setAddItems(additems + 1);
  };

  const removeFromCart = () => {
    const ItemPresent = cart.find((item) => item.id === pizza.id);
    if (additems === 1) {
      setSelected(false);

      setCart(cart.filter((x) => x.id !== pizza.id));
    } else {
      setCart(
        cart.map((x) =>
          x.id === pizza.id
            ? { ...ItemPresent, quantity: ItemPresent.quantity - 1 }
            : x
        )
      );
    }
    setAddItems(Math.max(0, additems - 1));
    let toast = Toast.show("Removido", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
    setTimeout(function () {
      Toast.hide(toast);
    }, 2500);

  };

  return (
    <View>
      {data.map((item, index) => (
        <Pressable style={{ borderEndColor: "#fff", borderWidth: 0.1 }}>
          <Image
            style={{ height: 200, aspectRatio: 1 / 1, resizeMode: "cover" }}
            source={{ uri: item.image }}
          />
          <View style={{ backgroundColor: "#740005", padding: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              {item.name.substr(0, 14)}
            </Text>

            <Text style={{ color: "white", marginTop: 4 }}>
              {item.description.substr(0, 20) + "..."}
            </Text>

            <Pressable
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View>
                <Text style={{ color: "white", fontSize: 15 }}>Preço</Text>
                <Text style={{ color: 'white', fontSize: 18 }}>R$ {item.price}</Text>
              </View>

              {selected ? (
                <Pressable
                  style={{
                    backgroundColor: "#444801",
                    padding: 2,
                    marginLeft: 15,
                    borderRadius: 4,

                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Pressable onPress={removeFromCart}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        paddingHorizontal: 10,

                        fontWeight: "600",
                      }}
                    >
                      -
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        paddingHorizontal: 5,
                        fontWeight: "600",
                      }}
                    >
                      {additems}
                    </Text>
                  </Pressable>

                  <Pressable onPress={addToCart}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        paddingHorizontal: 10,
                        fontWeight: "600",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </Pressable>
              ) : (
                <Pressable
                  onPress={addToCart}
                  style={{
                    backgroundColor: "#444801",
                    padding: 5,
                    marginLeft: 15,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Adicionar
                  </Text>
                </Pressable>
              )}
            </Pressable>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default PizzaComponent;

const styles = StyleSheet.create({});