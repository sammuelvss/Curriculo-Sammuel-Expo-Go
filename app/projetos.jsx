import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, FlatList, StyleSheet, RefreshControl, Linking } from "react-native";
import {
  Button,
  Card,
  Chip,
  FAB,
  IconButton,
  Modal,
  Portal,
  Searchbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { projectService } from "../services/api";
import { useStore } from "../zustand";

export default function ProjetosScreen() {
  const theme = useTheme();
  const { perfilAtivoId, toggleFavorito, isFavorito } = useStore();

  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tecnologias, setTecnologias] = useState("");
  const [link, setLink] = useState("");

  const fetchProjects = async () => {
    try {
      setError(null);
      const data = await projectService.getByProfile(perfilAtivoId);
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os projetos.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProjects();
  }, [perfilAtivoId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProjects();
  }, [perfilAtivoId]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const term = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.titulo?.toLowerCase().includes(term) ||
        p.descricao?.toLowerCase().includes(term) ||
        p.tecnologias?.toLowerCase().includes(term)
    );
  }, [projects, searchQuery]);

  const handleCreateProject = async () => {
    if (!titulo.trim()) return;
    try {
      setSubmitting(true);
      await projectService.create({
        titulo: titulo.trim(),
        descricao: descricao.trim() || "Projeto adicionado via App Mobile Expo Go.",
        tecnologias: tecnologias.trim() || "React Native, Expo, Node.js",
        link: link.trim() || "https://github.com/sammuelvss",
        profile_id: perfilAtivoId,
      });
      setTitulo("");
      setDescricao("");
      setTecnologias("");
      setLink("");
      setModalVisible(false);
      fetchProjects();
    } catch (err) {
      console.error("Erro ao criar projeto:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await projectService.delete(id);
      fetchProjects();
    } catch (err) {
      console.error("Erro ao remover projeto:", err);
    }
  };

  const openLink = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error("Erro ao abrir link:", err));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Galeria de Projetos" subtitle="Portfólio, Eventos e Repositórios" />

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar por tecnologia ou título..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
          elevation={1}
        />
      </View>

      {loading ? (
        <Loading message="Carregando projetos..." />
      ) : error ? (
        <EmptyState title="Ops!" description={error} onRetry={fetchProjects} />
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          icon="folder-search-outline"
          title={searchQuery ? "Nenhum projeto encontrado" : "Nenhum projeto cadastrado"}
          description={
            searchQuery
              ? `Nenhum resultado corresponde à busca "${searchQuery}".`
              : "Nenhum projeto registrado para este perfil."
          }
          onRetry={searchQuery ? () => setSearchQuery("") : fetchProjects}
        />
      ) : (
        <FlatList
          data={filteredProjects}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />}
          renderItem={({ item }) => {
            const favorito = isFavorito(item.id);
            const techList = item.tecnologias
              ? item.tecnologias.split(",").map((t) => t.trim())
              : [];

            return (
              <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                <Card.Title
                  title={item.titulo}
                  titleVariant="titleMedium"
                  titleStyle={{ fontWeight: "bold" }}
                  left={(props) => (
                    <View style={[styles.iconContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
                      <MaterialCommunityIcons name="code-tags" size={24} color={theme.colors.primary} />
                    </View>
                  )}
                  right={(props) => (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <IconButton
                        {...props}
                        icon={favorito ? "star" : "star-outline"}
                        iconColor={favorito ? "#EAB308" : theme.colors.onSurfaceVariant}
                        onPress={() => toggleFavorito(item.id)}
                      />
                      <IconButton
                        {...props}
                        icon="delete-outline"
                        iconColor={theme.colors.error}
                        onPress={() => handleDeleteProject(item.id)}
                      />
                    </View>
                  )}
                />

                <Card.Content>
                  {item.descricao ? (
                    <Text variant="bodyMedium" style={[styles.descricao, { color: theme.colors.onSurfaceVariant }]}>
                      {item.descricao}
                    </Text>
                  ) : null}

                  {techList.length > 0 && (
                    <View style={styles.techWrapper}>
                      {techList.map((tech, index) => (
                        <Chip
                          key={index}
                          compact
                          style={[styles.techChip, { backgroundColor: theme.colors.surfaceVariant }]}
                          textStyle={{ fontSize: 11, color: theme.colors.primary, fontWeight: "600" }}
                        >
                          {tech}
                        </Chip>
                      ))}
                    </View>
                  )}
                </Card.Content>

                {item.link ? (
                  <Card.Actions style={styles.cardActions}>
                    <Button
                      mode="contained-tonal"
                      icon="open-in-new"
                      onPress={() => openLink(item.link)}
                      buttonColor={theme.colors.surfaceVariant}
                      textColor={theme.colors.primary}
                    >
                      Acessar Repositório / Link
                    </Button>
                  </Card.Actions>
                ) : null}
              </Card>
            );
          }}
        />
      )}

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}
        >
          <Text variant="titleLarge" style={{ fontWeight: "bold", marginBottom: 12, color: theme.colors.onSurface }}>
            Novo Projeto (NeonDB)
          </Text>
          <TextInput
            label="Título do Projeto *"
            value={titulo}
            onChangeText={setTitulo}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />
          <TextInput
            label="Tecnologias (separadas por vírgula)"
            placeholder="Ex: React Native, Node.js, PostgreSQL"
            value={tecnologias}
            onChangeText={setTecnologias}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Link do Repositório"
            placeholder="https://github.com/sammuelvss/..."
            value={link}
            onChangeText={setLink}
            mode="outlined"
            style={styles.input}
          />
          <View style={styles.modalActions}>
            <Button mode="text" onPress={() => setModalVisible(false)} disabled={submitting}>
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={handleCreateProject}
              loading={submitting}
              disabled={!titulo.trim() || submitting}
            >
              Salvar no Banco
            </Button>
          </View>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        label="Novo Projeto"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color="#FFFFFF"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  searchBar: {
    borderRadius: 12,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 88,
  },
  card: {
    marginBottom: 14,
    borderRadius: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  descricao: {
    lineHeight: 22,
    marginBottom: 12,
  },
  techWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  techChip: {
    marginRight: 4,
    marginBottom: 4,
  },
  cardActions: {
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    borderRadius: 16,
  },
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  input: {
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 8,
  },
});
