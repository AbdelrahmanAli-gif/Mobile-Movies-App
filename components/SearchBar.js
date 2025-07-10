import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({ searchText, setSearchText }) => {
    return (
        <View style={styles.searchWrapper}>
            <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
            <TextInput value={searchText} onChangeText={setSearchText} placeholder="Search movies..." placeholderTextColor={"gray"} style={styles.searchInput} />
        </View>
    );
}

const styles = StyleSheet.create({
    searchWrapper: { flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, color: 'white', },
    searchIcon: { position: 'absolute', left: 10, top: 10, zIndex: 1, },
    searchInput: { padding: 10, paddingLeft: 30, color: "white" }
})

export default SearchBar;
