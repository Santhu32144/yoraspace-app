import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReconnectTabs } from "../../components/reconnect/ReconnectTabs";
import { Trail } from "../../types/reconnect";
import { projects } from "../../data/reconnectData";
import FeedTab from "../../components/reconnect/FeedTab";
import SessionsTab from "../../components/reconnect/SessionsTab";
import ConnectsTab from "../../components/reconnect/ConnectsTab";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const trails: Trail[] = [
  {
    id: "1",
    icon: "🧘‍♂️",
    title: "From Overwhelm to Stillness",
    description: "A 5-step journey to find calm in chaos",
    progress: 0,
    totalSteps: 5,
  },
  {
    id: "2",
    icon: "🍃",
    title: "The Art of Letting Go",
    description: "Release what no longer serves you",
    progress: 0,
    totalSteps: 7,
  },
  {
    id: "3",
    icon: "💚",
    title: "Kindness to Self",
    description: "Learn to speak to yourself with love",
    progress: 0,
    totalSteps: 4,
  },
];

export function ReconnectScreen() {
  const [activeTab, setActiveTab] = useState('Trails');

  const renderContent = () => {
    switch (activeTab) {
      case 'Trails':
        return (
          <>
            {trails.map((trail) => (
              <StyledView
                key={trail.id}
                className="mb-4 overflow-hidden"
                style={{
                  borderRadius: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <StyledView 
                  style={{
                    padding: 16,
                  }}
                >
                  <StyledView className="flex-row items-center mb-2">
                    <Text style={{ fontSize: 24, marginRight: 8 }}>{trail.icon}</Text>
                    <StyledView className="flex-1">
                      <StyledText 
                        style={{ 
                          color: '#FFFFFF',
                          fontSize: 16,
                          fontWeight: '600',
                          marginBottom: 4,
                        }}
                      >
                        {trail.title}
                      </StyledText>
                      <StyledText 
                        style={{ 
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontSize: 14,
                        }}
                      >
                        {trail.description}
                      </StyledText>
                    </StyledView>
                    <StyledText 
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: 14,
                      }}
                    >
                      {trail.progress}/{trail.totalSteps}
                    </StyledText>
                  </StyledView>

                  <StyledView className="flex-row items-center justify-between mb-3">
                    <StyledText style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 13 }}>
                      Progress
                    </StyledText>
                    <StyledText
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: 13,
                        fontWeight: "600",
                      }}
                    >
                      {trail.progress}/{trail.totalSteps} Steps
                    </StyledText>
                  </StyledView>

                  <StyledView
                    style={{
                      height: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    <StyledView
                      style={{
                        height: "100%",
                        width: `${(trail.progress / trail.totalSteps) * 100}%`,
                        backgroundColor: '#9D8CE3',
                        borderRadius: 1,
                      }}
                    />
                  </StyledView>
                </StyledView>

                <StyledTouchableOpacity
                  style={{
                    backgroundColor: '#9D8CE3',
                    paddingVertical: 12,
                    borderRadius: 12,
                  }}
                  className="items-center justify-center"
                >
                  <StyledText
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Begin Trail
                  </StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            ))}
          </>
        );
      case 'Projects':
        return (
          <>
            {projects.map((project) => (
              <StyledView
                key={project.id}
                className="mb-4 overflow-hidden"
                style={{
                  borderRadius: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  padding: 20,
                }}
              >
                <StyledText 
                  style={{ 
                    color: '#8B5CF6',
                    fontSize: 12,
                    fontWeight: '600',
                    marginBottom: 4,
                    textTransform: 'uppercase',
                  }}
                >
                  {project.category}
                </StyledText>
                <StyledText 
                  style={{ 
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 8,
                  }}
                >
                  {project.title}
                </StyledText>
                <StyledText 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: 14,
                    marginBottom: 12,
                  }}
                >
                  {project.description}
                </StyledText>
                {project.steps.slice(0, 2).map((step, index) => (
                  <StyledText 
                    key={index}
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    • {step.title}
                  </StyledText>
                ))}
                <StyledText 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: 14,
                    marginTop: 8,
                    marginBottom: 16,
                  }}
                >
                  {project.steps.filter(step => step.completed).length}/{project.steps.length}
                </StyledText>
                <StyledTouchableOpacity
                  style={{
                    backgroundColor: '#8B5CF6',
                    paddingVertical: 16,
                    borderRadius: 12,
                  }}
                  className="items-center justify-center"
                >
                  <StyledText
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Start Project
                  </StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            ))}
          </>
        );
      case 'Sessions':
        return <SessionsTab />;
      case 'Connects':
        return <ConnectsTab />;
      case 'Feed':
        return <FeedTab />;
      default:
        return null;
    }
  };

  return (
    <StyledView style={{ flex: 1, backgroundColor: '#2D1B69' }}>
      <StyledSafeAreaView style={{ flex: 1 }}>
        <StyledView
          style={{
            paddingHorizontal: 24,
            paddingVertical: 20,
          }}
      >
        <StyledText
          style={{
            color: "#FFFFFF",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Reconnect
        </StyledText>
        <StyledText
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: 16,
          }}
        >
          Grow through guided journeys, projects, and community connection
        </StyledText>
      </StyledView>

      <ReconnectTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      <StyledScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16 }}
      >
        {renderContent()}
      </StyledScrollView>
    </StyledSafeAreaView>
    </StyledView>
  );
}
