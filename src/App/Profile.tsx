import { Image, Text, View } from "react-native";
import { Avatar } from "~/components/Avatar";

export function Profile() { 
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' , height: 100, padding: 20 }}>  
            <Text className="mb-4">Witallo rei delas</Text>
            <Avatar>
                <Image
                    source={{ uri: 'https://avatars.githubusercontent.com/u/46324934?s=400&u=58a1cf63485cc54491a2e780dbc26b25f8c41859&v=4' }}
                    alt="Avatar"
                    className="w-full h-full rounded-full"
                />    
            </Avatar>
        </View>
    );
}