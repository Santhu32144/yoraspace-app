import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { feedItems } from "../../data/reconnectData";
import { useTheme } from "../../hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface FeedQuoteCardProps {
  quote: string;
  author: string;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  total: number;
}

const FeedQuoteCard: React.FC<FeedQuoteCardProps> = ({
  quote,
  author,
  onNext,
  onPrev,
  currentIndex,
  total,
}) => {
  const { colors } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.navigationButtons}>
          <TouchableOpacity onPress={onPrev} style={styles.navButton}>
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext} style={styles.navButton}>
            <Text style={styles.navButtonText}>→</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.quote}>"{quote}"</Text>
        <Text style={styles.author}>— {author}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, isFavorite && styles.favoriteButton]}
            onPress={toggleFavorite}
          >
            <Text style={styles.actionButtonText}>
              {isFavorite ? "♥ Favorite" : "♡ Favorite"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pagination}>
          {Array.from({ length: total }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor:
                    index === currentIndex
                      ? "#B28DFF"
                      : "rgba(255, 255, 255, 0.3)",
                  width: index === currentIndex ? 16 : 8,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const FeedTab: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Feed");
  const { colors } = useTheme();

  const handleNext = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % feedItems.length);
  };

  const handlePrev = () => {
    setCurrentQuoteIndex(
      (prev) => (prev - 1 + feedItems.length) % feedItems.length
    );
  };

  const tabs = ["Trails", "Projects", "Sessions", "Connects", "Feed"];

  return (
    <View style={[styles.container, { backgroundColor: "#362360" }]}>
      <FeedQuoteCard
        quote={feedItems[currentQuoteIndex].quote}
        author={feedItems[currentQuoteIndex].author}
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={currentQuoteIndex}
        total={feedItems.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    opacity: 0.8,
    maxWidth: "85%",
  },
  cardContainer: {
    marginVertical: 16,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    backgroundColor: "#2C1E50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    position: "relative",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: "50%",
    left: -16,
    right: -16,
    zIndex: 1,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  quote: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 24,
    lineHeight: 32,
    color: "white",
  },
  author: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "rgba(255, 255, 255, 0.7)",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  favoriteButton: {
    borderColor: "#B28DFF",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  paginationDot: {
    height: 6,
    borderRadius: 3,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 30,
    marginBottom: 20,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 26,
  },
  activeTabButton: {
    backgroundColor: "#B28DFF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    opacity: 0.7,
  },
  activeTabText: {
    opacity: 1,
  },
});

export default FeedTab;
