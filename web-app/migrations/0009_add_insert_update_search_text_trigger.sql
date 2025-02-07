-- Custom SQL migration file, put your code below! --
-- Vérifie d'abord si la fonction existe pour éviter les erreurs
DROP FUNCTION IF EXISTS update_search_text CASCADE;

-- Crée la fonction qui met à jour `search_text` seulement si nécessaire
CREATE FUNCTION update_search_text() RETURNS TRIGGER AS $$
BEGIN
  -- Mettre à jour search_text SEULEMENT si les colonnes importantes changent
  IF (TG_OP = 'INSERT') OR
    (NEW.title <> OLD.title OR 
     NEW.author <> OLD.author OR 
     NEW.genre <> OLD.genre OR 
     NEW.description <> OLD.description OR 
     NEW.summary <> OLD.summary) THEN
    NEW.search_text := to_tsvector(
      'english', 
      COALESCE(NEW.title, '') || ' ' || 
      COALESCE(NEW.author, '') || ' ' || 
      COALESCE(NEW.genre, '') || ' ' || 
      COALESCE(NEW.description, '') || ' ' || 
      COALESCE(NEW.summary, '')
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Supprime le trigger existant s'il y en a un
DROP TRIGGER IF EXISTS trigger_update_search_text ON books;

-- Crée un nouveau trigger qui met à jour `search_text` avant chaque INSERT ou UPDATE
CREATE TRIGGER trigger_update_search_text
BEFORE INSERT OR UPDATE ON books
FOR EACH ROW
EXECUTE FUNCTION update_search_text();
