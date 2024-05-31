import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';

export default function TaskComponent() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const taskCall = async () => {
      try {
        const response = await axios.get(`${API_URL}/tasks/home/1`);
        setTasks(response.data); // Suppose the response is an array of tasks
      } catch (error) {
        console.error(error);
      }
    };
    taskCall();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {tasks.map((task, index) => (
          <View style={styles.taskContainer} key={index}>
            <Text>{task.title}</Text>
            <Text>{task.deadline}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  taskContainer: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
