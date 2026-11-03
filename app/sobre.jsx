import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Divider, List, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import { API_BASE_URL } from "../services/api";

export default function SobreScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Sobre o Aplicativo" subtitle="Tecnologias, Módulos & Extras" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Currículo & Portfólio Mobile"
            subtitle="Programação para Dispositivos Móveis (2026.2)"
            left={(props) => (
              <MaterialCommunityIcons {...props} name="cellphone-cog" size={28} color={theme.colors.primary} />
            )}
          />
          <Card.Content>
            <Text variant="bodyMedium" style={[styles.paragraph, { color: theme.colors.onSurfaceVariant }]}>
              Aplicativo mobile desenvolvido com React Native e Expo Router para exibir o currículo e portfólio de
              Sammuel Victor Santana de Souza. Conecta-se em tempo real ao back-end Express publicado na Vercel e ao
              banco de dados PostgreSQL hospedado no NeonDB.
            </Text>
          </Card.Content>
        </Card>

        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Tecnologias & Módulos Utilizados"
            subtitle="Stack e Bibliotecas do Projeto"
            left={(props) => (
              <MaterialCommunityIcons {...props} name="layers-triple" size={28} color={theme.colors.primary} />
            )}
          />
          <Card.Content>
            <List.Item
              title="React Native & Expo SDK"
              description="Framework multiplataforma para desenvolvimento mobile nativo com suporte a OTA Updates."
              left={(props) => <List.Icon {...props} icon="react" color="#0EA5E9" />}
            />
            <Divider />
            <List.Item
              title="Expo Router (Navegação em Abas)"
              description="Roteamento baseado em arquivos estruturando as 5 telas: Início, Acadêmico, Profissional, Projetos e Sobre."
              left={(props) => <List.Icon {...props} icon="routes" color="#6366F1" />}
            />
            <Divider />
            <List.Item
              title="React Native Paper (Material Design 3)"
              description="Componentes visuais modernos (Cards, Chips, FAB, Modal, SegmentedButtons, Searchbar) e temas."
              left={(props) => <List.Icon {...props} icon="palette" color="#EC4899" />}
            />
            <Divider />
            <List.Item
              title="Zustand + AsyncStorage"
              description="Gerenciamento de estado global leve com persistência local no dispositivo."
              left={(props) => <List.Icon {...props} icon="database" color="#F59E0B" />}
            />
            <Divider />
            <List.Item
              title="Axios + API REST Express (Vercel + NeonDB)"
              description="Cliente HTTP consumindo os endpoints de perfis, formações, experiências e projetos."
              left={(props) => <List.Icon {...props} icon="api" color="#10B981" />}
            />
          </Card.Content>
        </Card>

        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Funcionalidades Extras Implementadas"
            subtitle="Diferenciais técnicos adicionados ao App"
            left={(props) => (
              <MaterialCommunityIcons {...props} name="star-circle" size={28} color={theme.colors.primary} />
            )}
          />
          <Card.Content>
            <List.Item
              title="1. Cadastro e Exclusão de Projetos pelo App (CRUD)"
              description="Botão flutuante (+ Novo Projeto) e exclusão direta na aba Projetos, persistindo em tempo real no PostgreSQL (NeonDB)."
              left={(props) => <List.Icon {...props} icon="plus-box" color={theme.colors.primary} />}
            />
            <Divider />
            <List.Item
              title="2. Alternador de Currículo em Tempo Real"
              description="Seletor no topo da tela inicial que alterna entre os 2 currículos cadastrados no NeonDB (Sammuel Victor e Beatriz Cavalcanti)."
              left={(props) => <List.Icon {...props} icon="account-switch" color={theme.colors.primary} />}
            />
            <Divider />
            <List.Item
              title="3. Tema Claro / Escuro Persistente (Dark Mode)"
              description="Chave seletora no cabeçalho de todas as telas com salvamento automático no AsyncStorage."
              left={(props) => <List.Icon {...props} icon="theme-light-dark" color={theme.colors.primary} />}
            />
            <Divider />
            <List.Item
              title="4. Busca Dinâmica e Favoritos em Projetos"
              description="Filtro instantâneo por tecnologia ou título e marcação de projetos favoritos com estrela."
              left={(props) => <List.Icon {...props} icon="star" color="#EAB308" />}
            />
          </Card.Content>
        </Card>

        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Autor & Back-End"
            left={(props) => (
              <MaterialCommunityIcons {...props} name="information-outline" size={28} color={theme.colors.primary} />
            )}
          />
          <Card.Content>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
              <Text style={{ fontWeight: "bold" }}>Desenvolvedor:</Text> Sammuel Victor Santana de Souza
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
              <Text style={{ fontWeight: "bold" }}>Curso:</Text> Sistemas para Internet — 4º Período (UNICAP)
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
              <Text style={{ fontWeight: "bold" }}>API em Produção:</Text> {API_BASE_URL}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              <Text style={{ fontWeight: "bold" }}>Banco de Dados:</Text> PostgreSQL (NeonDB Cloud)
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 14,
    borderRadius: 14,
  },
  paragraph: {
    lineHeight: 22,
  },
});
