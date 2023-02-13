package shop.controllers;

import org.springframework.web.bind.annotation.*;
import shop.dto.CategoryDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HomeController {
    private static List<CategoryDTO> list = new ArrayList<CategoryDTO>();
    @GetMapping("/")
    public List<CategoryDTO> index(){
        return list;
    }

    @PostMapping("/")
    public void add(@RequestBody CategoryDTO c){
        list.add(c);
    }

    @DeleteMapping("/")
    public void del(@RequestBody int c){
        list.remove(list.get(c));
    }

    @PutMapping("/")
    public void update(@RequestBody CategoryDTO c){
        int idx = 0;
        for (CategoryDTO item: list) {
            if(item.getId()==c.getId())
            {
                break;
            }
            ++idx;
        }
        list.get(idx).setName(c.getName());
    }
}
