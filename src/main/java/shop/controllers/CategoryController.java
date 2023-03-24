package shop.controllers;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CreateCategoryDTO;
import shop.entities.CategoryEntity;
import shop.interfaces.CategoryService;
import shop.mapper.CategoryMapper;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final StorageService storageService;
    private final CategoryService categoryService;
    @GetMapping
    public ResponseEntity<List<CategoryItemDTO>> index() throws InterruptedException {
        var result = categoryService.get();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CategoryItemDTO> create(@ModelAttribute CreateCategoryDTO model) throws InterruptedException {
        var result = categoryService.create(model);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
    @GetMapping("{id}")
    public ResponseEntity<CategoryItemDTO> get(@PathVariable("id") int categoryId) throws InterruptedException {
        var result = categoryService.get(categoryId);
        if(result!=null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PutMapping("{id}")
    public ResponseEntity<CategoryItemDTO> update(@PathVariable("id") int categoryId,
                                                 @RequestBody CreateCategoryDTO model) throws InterruptedException {
        var result = categoryService.update(categoryId, model);
        if(result!=null) {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int categoryId) throws InterruptedException {
        categoryService.delete(categoryId);
        return new ResponseEntity<>("Катагорія знищена.", HttpStatus.OK);
    }
}
