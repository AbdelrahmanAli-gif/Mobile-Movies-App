import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Filters = ({ data, onSelect }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

    const handleSelect = (item) => {
        onSelect(item);
        setDropdownVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
                <View style={styles.flex}>
                    <Text style={styles.buttonText}>
                        Filters
                    </Text>
                    <Icon name="filter-list" size={20} color="white" />
                </View>
            </TouchableOpacity>
            {isDropdownVisible && (
                <View style={styles.dropdown}>
                    {data.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.option}
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginLeft: 10 },
    flex: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    button: { borderRadius: 5, paddingHorizontal: 10, flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, borderColor: "gray", borderWidth: 1, },
    buttonText: { color: "white", textAlign: "center", fontSize: 16, },
    dropdown: { marginTop: 5, backgroundColor: "white", borderRadius: 5, position: "absolute", zIndex: 2, top: 45, right: 0, width: 150 },
    option: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd", },
    optionText: { fontSize: 16, },
});

export default Filters;