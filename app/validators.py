from app.config import TIPOS_PERMITIDOS, STATUS_PERMITIDOS

def validate_item(data):
    if "titulo" not in data or len(data["titulo"]) < 3:
        return "Título deve ter no mínimo 3 caracteres"

    if "tipo" not in data or data["tipo"] not in TIPOS_PERMITIDOS:
        return "Tipo inválido"

    if "status" not in data or data["status"] not in STATUS_PERMITIDOS:
        return "Status inválido"

    if "valor" in data and data["valor"] < 0:
        return "Valor deve ser maior ou igual a zero"

    return None
