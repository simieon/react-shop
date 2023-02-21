package shop.dto;

import lombok.Data;

@Data
public class UserDTO {
    private int id;
    private String login;
    private String password;

    public UserDTO() {
    }

    public UserDTO(int id, String login, String password) {
        this.id = id;
        this.login = login;
        this.password = password;
    }
}
